'use strict'

const WebSocket = require('ws')
const express = require('express')
const api = express.Router()
const app = express()
const fetch = require('node-fetch')
const http = require('http')
const BitSet = require('./commons/BitSet')
const NeatElectionDays = require('./commons/services/server/NeatElectionDays')
const {mergeCounties} = require('./commons/elections/race')
// const ELECTIONS_CONFIG = require('./config')
let ELECTIONS_CONFIG = {}
const xyzzy = ELECTIONS_CONFIG.XYZZY
const TARGET_HOST = 'neat.inbcu.com'

const headServiceState = {
    was_closed: false
}
const editorialDayCacheMap = new Map()
const editorialCacheDays = []
let cacheCountdown = []
const electionDates = []
const historicalCacheMap = new Map()
const historicalRaceMap = new Map()
const jsonHistoricalCacheMap = new Map()

const postOnly = process.argv[2] == 'postCloseOnly';

let trustedByHead = false;
let wss = null
let wsHead = null

const DEBUG = false

function horseRace(race) {
    const newOrder = race.candidates.map(c => c.candidate_code)
    if(DEBUG) console.log(race.candidates)
    // console.log(newOrder)
    race.counties.forEach(c => {
        c.candidates.sort((a, b) => {
            return newOrder.indexOf(a.code) - newOrder.indexOf(b.code)
        })
    })
}

class ElectionDayCache {

    constructor(options) {
        this.raceMap = new Map()
        this.racePosMap = new Map()
        this.jsonMap = new Map()
        this.electionDate = options.election_date
        console.log(`.............  ...............  ................  ${this.electionDate}`)
        this.editorialSnapshot = null
        this.editorialLastUpdated = 0
        this.lastSummary = {}
        this.lastEVote = []
        this.lastSummaryJSON = {}
        this.allMessagesArray = []
        this.messageSnapshot = {}
        this.delSock = {}
    }

    makeSubscription(ws, topic, dayID) {
        if (!ws.config.subscriptions.includes(topic)) {
            if(DEBUG) console.log(`>>>>>> >>>>>> NOW Subscribing to ${topic}`)
            ws.config.subscriptions.push(topic)
            ws.config['day_id'] = dayID
            const x = {subscribed: topic}
            if(DEBUG) console.log(x)
            ws.send(JSON.stringify(x))
        }
    }

    snapshot() {
        if (this.editorialSnapshot) {
            if(DEBUG) console.log("Editorial Snapshot!!!")
            this.editorialSnapshot.races = Array.from(this.raceMap.values())
            this.editorialSnapshot['summary'] = this.lastSummary
            this.editorialSnapshot['evote_summary'] = this.lastEVote
            const nocounties = []
            for( const race of this.editorialSnapshot.races) {
                nocounties.push( Object.assign({}, race, {counties: []}))
            }
            this.editorialSnapshot.races = nocounties
            return this.editorialSnapshot
        } else
            return {}
    }

    updateSnapshot(o) {
        console.log('updateSnapshot')
        if(!this.editorialSnapshot)
            this.editorialSnapshot = o
        this.editorialSnapshot['summary'] = this.lastSummary
        this.editorialSnapshot['evote_summary'] = this.lastEVote
    }

    sendSnapshot(ws, topic, options) {
        switch (topic) {
            case 'messages':
                if(DEBUG) console.log('>>>>>> SNAPSHOT to messages')
                this.messageSnapshot.messages = this.allMessagesArray
                // console.log(JSON.stringify(messageSnapshot))
                ws.send(JSON.stringify({messages: this.messageSnapshot}))
                break
            case 'edi':
                if(DEBUG) console.log(`>>>>>> SNAPSHOT to edi`)
                ws.send(JSON.stringify({edi: {snap: this.snapshot()}}))
                break
        }
    }

    updateClock(jsClock) {
        const self = this
        try {
            if (wss) {
                const t = JSON.parse(jsClock)
                const msg = {clock: t}
                wss.clients.forEach(function each(client) {
                    if (client.config.subscriptions.includes('edi'))
                        if (client.readyState === WebSocket.OPEN) {
                            if (client.config && (client.config.day_id == self.electionDate || (!client.config.day_id && self.electionDate === ELECTIONS_CONFIG.ELECTION_DATE)))
                                client.send(JSON.stringify(msg))
                        }
                })
            }
        } catch (e) {
            console.error("ERROR ERROR (updateClock)")
            console.error(jsClock)
            console.error(e)
        }
    }

    updateEditorial(o) {
        if(DEBUG) console.log(`______________________________updateEditorial...`)
        for (const r of o.races) {
            for (const c of r.candidates) {
                c.major_party = c.major_party[0].toUpperCase() + c.major_party.slice(1).toLowerCase()
            }
        }
        if (o.updated > this.editorialLastUpdated) {
            if(o.evote_summary) {
                const evoteJSON = JSON.stringify(o.evote_summary)
                if (evoteJSON !== JSON.stringify(this.lastEVote)) {
                    if (wss) {
                        wss.clients.forEach(function each(client) {
                            if (client.readyState === WebSocket.OPEN) {
                                if(DEBUG) console.log(o.evote_summary)
                                client.send(JSON.stringify({edi: {evote_summary: o.evote_summary}}))
                            } else {
                                console.log("Web Socket not OPEN")
                                if(DEBUG) (client.user)
                            }
                        })
                    }
                    this.lastEVote = o.evote_summary
                } else {
                    delete o.evote_summary
                }
            }
            if (o.summary) {
                const summaryJSON = JSON.stringify(o.summary)
                if (summaryJSON !== JSON.stringify(this.lastSummary)) {
                    if (wss) {
                        wss.clients.forEach(function each(client) {
                            if (client.readyState === WebSocket.OPEN) {
                                client.send(JSON.stringify({edi: {summary: o.summary}}))
                            } else {
                                console.log("Web Socket not OPEN")
                                console.log(client.user)
                            }
                        })
                    }
                }
                this.lastSummary = o.summary
                delete o.summary
            }
            if (o.races.length > 0) {
                if(DEBUG) console.log(`WE HAVE ${o.races.length} RACES`)
                const self = this
                this.updateSnapshot(o)
                // for (const race of o.races) {
                const initPosMap = !Boolean(this.racePosMap.size)
                o.races.forEach((race, index) => {
                    // console.log(`trying ${race.race_id}`)
                    const currentRace = this.raceMap.get(race.race_id)
                    const mergedCounties = currentRace ? mergeCounties(race, currentRace) : race
                    this.raceMap.set(race.race_id, mergedCounties)
                    this.jsonMap.delete(race.race_id)
                    if (initPosMap) {
                        this.racePosMap.set(race.race_id, index + 1)
                    }
                })
                if (wss) {
                    o.races.forEach((race, index) => {
                        self.jsonMap.set(race.race_id, JSON.stringify({edi: {race: race}}))
                        wss.clients.forEach(function each(client) {
                            if (client.config && (client.config.all_races || race.state_code === 'US')) {
                                if (client.readyState === WebSocket.OPEN) {
                                    if (client.config && client.config.all_races && (client.config.all_races.indexOf(race.race_id) > -1)) {
                                        client.send(self.jsonMap.get(race.race_id))
                                    } else if (race.office_code === 'P' && race.state_code === 'US') {
                                        client.send(self.jsonMap.get(race.race_id))
                                    }
                                }
                            }
                        })
                    })
                }
            }
            if (!wss) {
                console.log("WAITING FOR INITIALIZATION...")
                cacheCountdown = cacheCountdown.filter(v => v !== this.electionDate)
                console.log(cacheCountdown)
                if (cacheCountdown.length === 0)
                    acceptServerConnections()
            }
            this.editorialLastUpdated = o.updated
        }
    }

    parseValidMessagesOnly(json) {
        const valid = []
        const o = JSON.parse(json)
        const dayCache = editorialDayCacheMap.get(o.day_id)
        for (const m of o.messages) {
            if (m.message) {
                if (!postOnly || this.isAPostCloseMessage(dayCache, m)) {
                    if(DEBUG) console.log(m.message)
                    valid.push(m)
                }
            }
        }
        o.messages = valid
        // console.log(`VALID: ${JSON.stringify(o)}`)
        return o
    }

    isAPostCloseMessage(dayCache, m) {
        if (m.message.indexOf("For use after") !== -1)
            return false
        if (m.message.indexOf("For DD Use:") !== -1)
            return false
        return true
    }

    // MESSAGE UPDATE FROM NEAT
    updateMessages(json) {
        const self = this
        if(DEBUG) console.log(`______________________________updateMessages...`)
        try {
            const o = this.parseValidMessagesOnly(json)
            if (o.messages.length > 0) {
                const msg = {messages: o}
                this.allMessagesArray = o.messages.concat(this.allMessagesArray)
                if(DEBUG) console.log(`ALL MESSAGE ARRAY LEN = ${this.allMessagesArray.length}`)
                this.messageSnapshot = Object.assign({}, o)
                this.messageSnapshot.messages = this.allMessagesArray
                if(DEBUG) console.log(`ABOUT TO WS.SEND ${o.messages.length} MESSAGES`)
                if(DEBUG) console.log(`UPDATED IS ${o.updated}`)
                if (wss) {
                    wss.clients.forEach(function each(client) {
                        if (client.readyState === WebSocket.OPEN) {
                            if (client.config && client.config.day_id == self.electionDate)
                                client.send(JSON.stringify(msg))
                        }
                    })
                }
            }
            return o.updated
        } catch (e) {
            console.error("ERROR ERROR ERROR (parseValidMessagesOnly)")
            console.error(json)
            console.error(e)
            return -1
        }
    }
}

function stripSimPrefix(raceId) {
    if (raceId[0] === 'S') {
        const rid = raceId.slice(5)
        if(DEBUG) console.log(rid)
        return rid
    }
    return raceId
}

// WB SOCKET CONNECTION
// . AUTHORIZED CONNECT TO LONG POLLER
// . SETTING UP DATA STREAM

function connectToHead(onTrusted) {
    console.log(`About to connect: ${ELECTIONS_CONFIG.HEAD_HOST}:${ELECTIONS_CONFIG.WS_HEADER_PORT}`)

    wsHead = new WebSocket(`ws://${ELECTIONS_CONFIG.HEAD_HOST}:${ELECTIONS_CONFIG.WS_HEADER_PORT}`)

    wsHead.on('open', () => {
        console.log("WS CONNECTION TO HEAD OPENED")
        start()
    })

    function start() {
        if (wsHead.readyState === WebSocket.OPEN) {
            const messageSub = {auth: "1231231231231231233", subscribe: "messages"}
            wsHead.send(JSON.stringify(messageSub))
            const subscription = {auth: "1231231231231231233", subscribe: "edi"}
            console.log(subscription)
            wsHead.send(JSON.stringify(subscription))
            const clockSub = {auth: "1231231231231231233", subscribe: "clock"}
            wsHead.send(JSON.stringify(clockSub))
        } else
            setTimeout(start, 1000)
    }

    wsHead.on('close', (json) => {
        console.log("HEAD CONNECTION CLOSED - Retrying connection")
        trustedByHead = false;
        headServiceState.was_closed = true
        wsHead.close()
        setTimeout(() => connectToHead(onTrusted), 2000)
    })

    wsHead.on('error', (error) => {
        console.error(error)
    })

    wsHead.on('message', (json) => {
        // console.log(`MESSAGE FROM HEAD ${json.length}`)
        const o = JSON.parse(json)
        // console.log(o)
        if(o.topic != 'clock')
            console.log(o)
        if (trustedByHead) {
            // console.log("Trusted by Head")
            if (o.editorial) {
                if(DEBUG) console.log('Editorial message')
                const edc = editorialDayCacheMap.get(o.editorial.day_id)
                edc.updateEditorial(o.editorial)
            } else if (o.snapshot) {
                if(DEBUG) console.log('Snapshot message')
                const edc = editorialDayCacheMap.get(o.snapshot.day_id)
                if (edc) {
                    if (o.topic === 'edi')
                        edc.updateEditorial(o.snapshot)
                    else if (o.topic === 'messages') {
                        edc.allMessagesArray = []
                        // edc.sendSnapshot(ws, o.snapshot, o.options)
                        edc.updateMessages(JSON.stringify(o.snapshot))
                    }
                }
            } else if (o.topic === 'clock') {
                const json = JSON.stringify(o.clockState)
                const edc = editorialDayCacheMap.get(o.day_id)
                if (edc)
                    edc.updateClock(json)
            } else if (o.topic === 'messages') {
                if(DEBUG) console.log("------------- messages -->")
                if(DEBUG) console.log(o)
                const edc = editorialDayCacheMap.get(o.day_id)
                edc.updateMessages(JSON.stringify(o))
            }

        } else if (o.trusted) {
            console.log("About to be trusted by Head")
            trustedByHead = true;
            onTrusted(o.electiondays)
            // snapshotRequests()
        }
    })
}

// STARTING APP
//   CONNECT TO LONGPOLLER WITH AUTH
//   SET CURRENT ELECTION DAYS

function startApp() {

    const options = {
        start_date: ELECTIONS_CONFIG.START_DATE,
        end_date: ELECTIONS_CONFIG.END_DATE,
        host: ELECTIONS_CONFIG.NEAT_HOST
    }
    const ned = new NeatElectionDays(options)

    function appTrusted(electiondays) {
        ned.hasElectionDays(electiondays)
    }

    connectToHead(appTrusted)

    ned.emitter.on('ELECTION_DAYS_READY', () => {
        console.log("ELECTION DAYS READY")
        ned.emitter.emit('READY_TO_START_DATES')
    })

    ned.emitter.on('READY_TO_START_DATES', () => {
        console.log("WE HAVE READY_TO_START_DATES.");
        const dates = []
        for (const electionDay of ned.electionDays) {
            if(DEBUG) console.log(electionDay)
            const options = {election_date: electionDay.day_id}
            if(DEBUG) console.log(options)
            const cache = new ElectionDayCache(options)
            editorialDayCacheMap.set(electionDay.day_id, cache)
            editorialCacheDays.push(electionDay.day_id)
            if(DEBUG) console.log(editorialCacheDays.length)
            dates.push(electionDay.election_date)
        }
        cacheCountdown = [...editorialCacheDays]
        const set = new Set(dates)
        set.forEach((s) => {
            electionDates.push(s)
        })
        console.log(`${ned.electionDays.length} election day caches created`)

        for (const day_id of editorialCacheDays) {
            console.log(`day: ${day_id}`)
            wsHead.send(JSON.stringify({snapshot: 'edi', day_id: day_id}))
            wsHead.send(JSON.stringify({snapshot: 'messages', day_id: day_id}))
        }
    })

}

// WEB SOCKET SERVER EVENT HANDLERS
function acceptServerConnections() {
    const ws_port = postOnly ? ELECTIONS_CONFIG.WS_EDITORIAL_POST_PORT : ELECTIONS_CONFIG.WS_EDITORIAL_PORT
    wss = new WebSocket.Server({port: ws_port}, () => {
        console.log(`I am listening on port ${ws_port}`)

        const http = require('http')
        const HTTP_TIMEOUT = 408;

        wss.on('connection', (ws, req) => {
            console.log('\nWS CONNECTION')
            ws.config = {}
            ws.config.subscriptions = []
            ws.config.pushed = []
            ws.config.authorized = false
            ws.config.challenging = false
            ws.config.authorizing = false
            serviceLog('edi', "NEW WS CONNECTION")

            ws.on('close', (message) => {
                console.log(ws.config.user)
                console.log(`++++++++++++ RACE +++++++++++++++ WebSocket CLOSED`)
            })

            ws.on('error', (err) => {
                console.error('WS ERROR:')
                console.error(err)
                console.error(ws.config.user)
            })

            ws.on('message', (json) => {
                const message = JSON.parse(json)
                if (!message) {
                    const s = JSON.stringify(ws.config.user)
                    serviceLog('edi', `Null message for ${s}`)
                    return
                }
                if (message.token) {
                    if (message.mod) {
                        ws.config.mod = message.mod
                        serviceLog(ws.config.mod, message)
                    } else {
                        // const x = {control: {message: "You need to update editorial."}}
                        // ws.send(JSON.stringify(x))
                        serviceLog("NO MOD", message)
                        return
                    }

                }
                if (message.pulse) {
                    // console.log(`Pulse`)
                    return
                }
                if (message.log) {
                    if(DEBUG) console.log(`Client log ${message.log}: ${message.content}`)
                    return
                }
                if (filterMessage(message))
                    processMessage(message)
            })

            function processMessage(message) {
                const x = message
                if(DEBUG) console.log(`>>> processMessage ${JSON.stringify(x, null, 4)}`)
                if (!x.day_id) return
                const edc = editorialDayCacheMap.get(x.day_id)
                if (edc) {
                    if(DEBUG) console.log('processMessage ready')
                    // const edc = editorialDayCacheMap.get("S002~2018-06-05")
                    if (x.svc) {
                        if(DEBUG) console.log(`SERVICE CHANGE: ${x.svc}`)
                        switch (x.svc) {
                            case 'edi':
                                if(DEBUG) console.log(`Have EDI svc change`)
                                if(DEBUG) console.log(x.config)
                                if (!ws.config)
                                    edc.makeSubscription(ws, "edi", x.day_id)
                                if (x.config && x.config.hasOwnProperty('all_races')) {
                                    ws.config.all_races = x.config.all_races
                                    if(DEBUG) console.log(`......... ${x.config.all_races}`)
                                    const arr = x.config.all_races.split(',')
                                    ws.config.bitMap = BitSet.make(arr.map(r => edc.racePosMap.get(r)))
                                    if(DEBUG) console.log(ws.config.bitMap.toString())
                                } else {
                                    console.error(`EDI DOES NOT HAVE all_races property. X.CONFIG is ${x.config}`)
                                }
                                if (x.config && x.config.added_races) {
                                    for (const raceId of x.config.added_races) {
                                            const race = edc.raceMap.get(raceId)
                                            if (race) {
                                                const json = JSON.stringify({edi: {race: race}})
                                                ws.send(json)
                                            }
                                    }
                                }
                                if (x.config.force) {
                                    switch (x.config.force) {
                                        case 'summary':
                                            if(DEBUG) console.log(edc.lastSummaryJSON)
                                            if (edc.lastSummaryJSON && edc.lastSummaryJSON.length > 1) {
                                                const sum = JSON.parse(edc.lastSummaryJSON)
                                                ws.send(JSON.stringify({edi: {summary: sum}}))
                                            }
                                    }
                                }
                                if (x.config.preset) {
                                    if(DEBUG) console.log('HAVE A PRESET!!!!!!!')
                                    ws.send(JSON.stringify({edi: {preset: true}}))
                                }
                        }
                    } else if (x.sync) {
                        console.log(`+++++++++++++++++++++++++++ SYNC ${x.sync}`)
                        switch (x.sync) {
                            case 'edi':
                                break
                            case 'messages':
                                const after = x.options.after
                                edc.messageSnapshot.messages = []
                                let remember = 0
                                for (const m of edc.allMessagesArray) {
                                    if (m.updated > after) {
                                        if (!remember) {
                                            remember = m.updated
                                        }
                                        // console.log(`SENDING MESSAGE: ${m.updated}`)
                                        edc.messageSnapshot.messages.push(m)
                                    } else break
                                }
                                edc.messageSnapshot.updated = remember
                                const msg = {messages: edc.messageSnapshot}
                                ws.send(JSON.stringify(msg))
                                break
                        }
                    } else if (x.subscribe) {
                        if(DEBUG) console.log(`SUBSCRIBE: ${x.subscribe}`)
                        if(DEBUG) console.log(x)
                        if (x.subscribe instanceof Array) {
                            for (const topic of x.subscribe) {
                                edc.makeSubscription(ws, topic, x.day_id)
                            }
                        } else {
                            if(DEBUG) console.log(`SUBSCRIBE ${x}`)
                            edc.makeSubscription(ws, x.subscribe, x.day_id)
                        }
                        // if(x.subscribe === 'edi')
                        //     ws.send(JSON.stringify({edi: {day_ids: editorialCacheDays}}))
                        ws.send(JSON.stringify({edi: {day_ids: editorialCacheDays}}))
                    } else if (x.snapshot) {
                        if(DEBUG) console.log(`SENDING SNAPSHOT..........................................`)
                        // console.log(x)
                        ws.config.day_id = x.day_id
                        edc.sendSnapshot(ws, x.snapshot, x.options)
                    }
                } else {
                    processHistorical(message)
                }
            }

            // SERVE HISTORICAL RACES FROM CACHE
            // . IF NOT IN CACHE PUT IT THERE
            function processHistorical(message) {
                if(DEBUG) console.log('processHistorical')
                const day_id = message.day_id
                if (historicalCacheMap.has(day_id)) {
                    if(DEBUG) console.log("--------- cached ---------------------------------------------------------")
                    if(DEBUG) console.log(message)
                    const day = historicalCacheMap.get(day_id)
                    if(DEBUG) console.log(day.day_id)
                    if (message.sync) {
                        if(DEBUG) console.log(`historical sync`)
                        if (message.sync === 'messages') {
                            if(DEBUG) console.log(`sending editorial messages`)
                            const msg = {messages: {day_id: day_id, messages: day.messages, sync: true}}
                            ws.send(JSON.stringify(msg))
                        }
                    } else if (message.snapshot) {
                        if(DEBUG) console.log(`historical snapshot`)
                        ws.send(jsonHistoricalCacheMap.get(day.day_id))
                    } else if (message.svc) {
                        if(DEBUG) console.log(`historical service`)
                        if(DEBUG) console.log(message.config)
                        if(message.config && message.config.added_races){
                            message.config.added_races.forEach( added => {
                                const race = historicalRaceMap.get(added)
                                if (race) {
                                    const json = JSON.stringify({edi: {race: race}})
                                    ws.send(json)
                                }
                            })
                        }
                        if(DEBUG) console.log(`historical service ends`)
                    }
                } else {
                    const apiPath = `http://${ELECTIONS_CONFIG.NEAT_HOST}/elections-api/day/counties/${message.day_id}`
                    console.log(apiPath)
                    fetch(apiPath)
                        .then(res => res.json())
                        .then(day => {
                            if (!historicalCacheMap.has(day_id)) {
                                if (day.election_type === 'P') {
                                    const year = day_id.slice(0, 4)
                                    if(DEBUG) console.log(`it's a primary in the year ${year}!`)
                                }
                                historicalCacheMap.set(day_id, day)
                                const cachedRaceArray = []
                                day.races.forEach( race => {
                                    if(race.hasOwnProperty('percent_in')){
                                        race.estimate_vote_percent = race.percent_in
                                        race.counties.forEach( county => {
                                            county.candidates.forEach( cand => {
                                              cand.vote_percent_2 = cand.vote_percent_1
                                            })
                                        })
                                    }
                                    historicalRaceMap.set(race.race_id, race)
                                    cachedRaceArray.push( Object.assign({}, race, {counties: []}) )
                                })
                                const json = JSON.stringify({edi: {snap: Object.assign({}, day, {messages: undefined, races: cachedRaceArray})}})
                                jsonHistoricalCacheMap.set(day_id, json)
                            }
                            processHistorical(message)
                            if(DEBUG) console.log("--------- new cache ---------------------------------------------------------")
                        });
                }
            }

            function filterMessage(message) {
                // AUTH GOES HERE
                return true
            }
        })
    })
}

function serviceLog(topic, message) {
    if(DEBUG) console.log(`Service log ${topic}: ${message}`)
}

http.get(`http://${TARGET_HOST}:54321/admin/config`, (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk
    })
    res.on('end', () => {
        ELECTIONS_CONFIG = JSON.parse(data)
        ELECTIONS_CONFIG.HEAD_HOST = TARGET_HOST
        ELECTIONS_CONFIG.COUNTY_POST_PRINT_PORT = 9108
        ELECTIONS_CONFIG.WS_EDITORIAL_PORT = 61101
        ELECTIONS_CONFIG.WS_EDITORIAL_POST_PORT = 61102
        console.log(ELECTIONS_CONFIG)
        // setTimeout(startApp, 5000)
        startApp()
    })
}).on('error', (err) => {
    console.log("STARTUP CONFIG Error: " + err.message)
})


// const WebSocket = require('ws')
// const server = WebSocket.WebSocketServer;

import WebSocket, {WebSocketServer} from 'ws';

import {MongoClient} from "mongodb";
import EventEmitter from "events";

import dotenv from 'dotenv'
const ENV_CONFIG = dotenv.config({path: './.env'}).parsed;
const DB_CONFIG = dotenv.config({path: './.envdb'}).parsed;

const emitter = new EventEmitter();
let db;
let wss = null

const DEBUG = false



const runApp = () => {

    console.log("La Casa Started-->\n");

    MongoClient.connect(DB_CONFIG.LACASA_ADM_URL, {useUnifiedTopology: true})
        .then((client) => {
            console.log(`Mongo connected ${DB_CONFIG.LACASA_ADM_URL}`);
            db = client.db('lacasa');
            db.collection('store_hours').createIndex("numeral", {unique: true})
                .catch(err => console.error(err))
        }).then( () => {
            console.log("start websocket server")
            acceptServerConnections()
        })
        .catch(err => {
            console.error(err)
        })
}

function acceptServerConnections() {
    const ws_port = parseInt(ENV_CONFIG.WS_LACASA_PORT)
    wss = new WebSocketServer( {port: ws_port}, () => {
        console.log(`I am listening on port ${ws_port}`)

        wss.on('connection', (ws, req) => {
            console.log('\nWS CONNECTION')
            ws.config = {}
            console.log("NEW WS CONNECTION")
            // getWeeklySchedule(ws)

            ws.on('close', (message) => {
                console.log(`++++++++++++ RACE +++++++++++++++ WebSocket CLOSED`)
            })

            ws.on('error', (err) => {
                console.error('WS ERROR:')
                console.error(err)
            })

            ws.on('message', (json) => {
                const message = JSON.parse(json)
                if (!message) {
                    console.log(`Message-> ${message}`)
                    return
                }
                if (filterMessage(message))
                    processMessage(message)
            })

            function processMessage(message) {
                const x = message
                console.log(`>>> processMessage ${JSON.stringify(x, null, 4)}`)
                if (x.sync) {
                        if (DEBUG) console.log(`SYNCING DATA..........................................`)
                    getWeeklySchedule(ws)
                }
            }

            function filterMessage(message) {
                // AUTH GOES HERE
                return true
            }
        })
    })

    function formatAMPM(hour) {
        if(hour < 0)
            return "Closed";
        var hours = hour/100;
        var minutes = hour%100
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    const getWeeklySchedule = (ws) => {
        db.collection('store_hours').find({},{projection: {_id: false}}).toArray()
            .then((arr) => {
                console.log(arr)
                const formattedArray = []
                for(const d of arr){
                    formattedArray.push({
                        numeral: d.numeral,
                        day: d.day,
                        from: formatAMPM(d.from),
                        to: formatAMPM(d.to),
                    })
                }
                const xx = {
                        weekly_hours_model: formattedArray
                }
                // ws.send(JSON.stringify(arr[1]))
                ws.send(JSON.stringify(xx));
            })
    }
}

runApp()
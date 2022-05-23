const MongoClient = require('mongodb').MongoClient;
const EventEmitter = require('events');

const ENV_CONFIG = require('dotenv').config({path: '../.env'}).parsed;
const DB_CONFIG = require('dotenv').config({path: '../.envdb'}).parsed;

const express = require('express')
const StoreHours = require("./dao/store-hours");
const api = express.Router()
const app = express()

const emitter = new EventEmitter();
let db;


const runApp = () => {

    console.log("La Casa Started-->\n");

    let mongoClientPromise = MongoClient.connect(DB_CONFIG.LACASA_ADM_URL, {useUnifiedTopology: true})
        .then((client) => {
            console.log(`Mongo connected ${DB_CONFIG.LACASA_ADM_URL}`);
            db = client.db('lacasa');
            db.collection('store_hours').createIndex("numeral", {unique: true})
                .catch(err => console.error(err))
        }).then( () => {
            console.log("start next")
        })
        .catch(err => {
            console.error(err)
        })
}
const getWeeklySchedule = (res) => {
    db.collection('store_hours').find({},{projection: {_id: false}}).toArray()
        .then((arr) => {
            console.log(arr)
            res.send(arr)
        })
}

api.get('/hours', (req,res) => {
    getWeeklySchedule(res)
})

app.use('/lacasa', api)
app.listen(45678);

runApp()
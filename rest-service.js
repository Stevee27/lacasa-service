
// import * as mongodb from 'mongodb';
// import UUID from 'uuid'

import { MongoClient } from 'mongodb';
import EventEmitter from 'events';

import dotenv from 'dotenv'
const ENV_CONFIG = dotenv.config({ path: './.env' }).parsed;
const DB_CONFIG = dotenv.config({ path: './.envdb' }).parsed;

import express, { Router } from 'express';
import StoreHours from "./dao/store-hours.js";
const api = Router()
const app = express()

const emitter = new EventEmitter();
let db;


const runApp = async () => {

    console.log("La Casa Started-->\n");

    try {
        const client = new MongoClient(DB_CONFIG.LACASA_ADM_URL);
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db('lacasa');
        db.collection('store_hours').createIndex("numeral", { unique: true })
            .catch(err => console.error(err));

        app.use('/lacasa', api);
        app.listen(45678);
    } catch (err) {
        console.error(err);
    }  finally {
        console.log('finally');
    }
}

const getWeeklySchedule = (res) => {
    db.collection('store_hours').find({}, { projection: { _id: false } }).toArray()
        .then((arr) => {
            res.send(arr)
            var b = new StoreHours(arr[5])
            console.log(b);
        })
}

api.get('/hours', (req, res) => {
    getWeeklySchedule(res)
})

runApp()
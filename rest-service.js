import mongoose from 'mongoose';
import dotenv from 'dotenv'
const DB_CONFIG = dotenv.config({ path: './.envdb' }).parsed;

import express, { Router } from 'express';
const api = Router()
const app = express()

// import EventEmitter from 'events';
// const emitter = new EventEmitter();

import StoreHours from './models/storehours.js'

const main = async () => {

    console.log("La Casa Started-->\n");

    try {
        await mongoose.connect(DB_CONFIG.LACASA_ADM_URL);
        console.log('Mongoose connected (db lacasa)');
        app.use('/lacasa', api);
        app.listen(45678);
    } catch (err) {
        console.error(err);
    } finally {
        console.log('finally');
    }
}

const getWeeklySchedule = async (res) => {
    const hours = await StoreHours.find();
    res.send(hours);
}

api.get('/hours', (req, res) => {
    getWeeklySchedule(res)
})

main()
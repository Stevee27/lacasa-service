import mongoose from 'mongoose';
import dotenv from 'dotenv'
const DB_CONFIG = dotenv.config({ path: './.envdb' }).parsed;

import express, { Router } from 'express';
const api = Router()
const app = express()

// import EventEmitter from 'events';
// const emitter = new EventEmitter();

import StoreHours from './models/storehours.js';
import MenuItem from './models/menu-item.js'
import Option from './models/option.js'

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

const getMenu = async (res) => {
    const menu = await MenuItem.find();
    res.send(menu);
}

const getOptions = async (res) => {
    const options = await Option.find();
    res.send(options);
}

api.get('/hours', (req, res) => {
    getWeeklySchedule(res)
})

api.get('/menu', (req, res) => {
    getMenu(res)
})

api.get('/options', (req, res) => {
    getOptions(res)
})

main()
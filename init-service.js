
import {MongoClient} from "mongodb";

import dotenv from 'dotenv'
const DB_CONFIG = dotenv.config({path: './.envdb'}).parsed;

import StoreHours from "./dao/store-hours.js";

let db;


const runApp = () => {

    console.log("La Casa Started-->\n");

    let mongoClientPromise = MongoClient.connect(DB_CONFIG.LACASA_ADM_URL, {useUnifiedTopology: true})
        .then((client) => {
            console.log(`Mongo connected ${DB_CONFIG.LACASA_ADM_URL}`);
            db = client.db('lacasa');
            db.collection('store_hours').createIndex("numeral", {unique: true})
                .catch(err => console.error(err))
            const storeHoursArray = [
                new StoreHours({
                    numeral: 1,
                    day: 'Monday',
                    from: -1,
                    to: -1,
                }),
                new StoreHours({
                    numeral: 2,
                    day: 'Tuesday',
                    from: 800,
                    to: 1500,
                }),
                new StoreHours({
                    numeral: 3,
                    day: 'Wednesday',
                    from: 800,
                    to: 1500,
                }),
                new StoreHours({
                    numeral: 4,
                    day: 'Thursday',
                    from: 800,
                    to: 1500,
                }),
                new StoreHours({
                    numeral: 5,
                    day: 'Friday',
                    from: 800,
                    to: 1500,
                }),
                new StoreHours({
                    numeral: 6,
                    day: 'Saturday',
                    from: 800,
                    to: 1700,
                }),
                new StoreHours({
                    numeral: 7,
                    day: 'Sunday',
                    from: 800,
                    to: 1400,
                }),
            ]
            db.collection('store_hours').insertMany(storeHoursArray)
                .then( res => {
                    console.log(res.ops)
                })
                .catch(err => {
                    console.error(err)
                })
        })
        .catch(err => {
            console.error(err)
        })
}

runApp()
import mongoose from 'mongoose';
import dotenv from 'dotenv'
const CONFIG = dotenv.config({ path: './.env' }).parsed;
const DB_CONFIG = dotenv.config({ path: './.envdb' }).parsed;

import express, { Router, urlencoded } from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema.js'

import StoreHours from './models/storehours.js';

const app = express()
// const api = Router()

const SALT = "$2a$10$Mr5Swe0k8xdQ/oIAwgHsGO"

mongoose.connect(DB_CONFIG.LACASA_ADM_URL);
mongoose.connection.once('open', async () => {
    console.log('Mongoose connected (db lacasa)');
    if (await StoreHours.estimatedDocumentCount().exec() < 7) {
        console.log('SOMETHING WRONG WITH DATABASE');
        return;
    }
    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }))
    app.post('/login', urlencoded(), (req, res) => {
        const username = req.body.username;
        const passwd = req.body.password
        console.log(username, passwd);
        res.send("OK");
    });
    app.listen(CONFIG.WS_LACASA_PORT, () => {
        console.log(`Listening on port ${CONFIG.WS_LACASA_PORT}`);
    })
});
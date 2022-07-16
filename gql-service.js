import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
const CONFIG = dotenv.config({ path: './.env' }).parsed;
const DB_CONFIG = dotenv.config({ path: './.envdb' }).parsed;

import express, { Router, urlencoded } from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema.js'

import StoreHours from './models/storehours.js';
import Authentication from './models/authentication.js'
import User from './models/user.js'

const app = express()
// const api = Router()

console.log(CONFIG.TOKEN_SECRET);

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
    app.post('/login', urlencoded(), async (req, res) => {
        const username = req.body.username;
        const passwd = req.body.password
        console.log(username, passwd);
        const authentication = await Authentication.findOne({ name: username }).exec();
        var validLogin = await bcrypt.compare(passwd, authentication.passwd);
        if (validLogin) {
            var user = await User.findOne({ username: username }).select({ firstName: 1, email: 1, _id: 0 });

            // var user = { username: username }
            var accessToken = jwt.sign(JSON.stringify(user), CONFIG.TOKEN_SECRET);
            res.json({ accessToken: accessToken });
        } else {
            res.status(401);
            res.json({ message: "Invalid Credentials" });
        }

    });
    app.listen(CONFIG.WS_LACASA_PORT, () => {
        console.log(`Listening on port ${CONFIG.WS_LACASA_PORT}`);
    })
});
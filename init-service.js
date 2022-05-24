
import {MongoClient} from "mongodb";

import dotenv from 'dotenv'
const DB_CONFIG = dotenv.config({path: './.envdb'}).parsed;

import StoreHours from "./dao/store-hours.js";
import MenuItemModel from "./dao/menu-item-model.js";

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
                
        const menuItemArray = [
            new MenuItemModel({
                numeral: 1,
                name: '',
                menutype: 'SANDWICH',
                desciption: 'Prosciutto, Fresh Mozzarella',
                smallPrice: '10.99',
                price: '11.99'
            }),
            new MenuItemModel({
                numeral: 2,
                name: '',
                menutype: 'SANDWICH',
                desciption: 'Ham, Salami, Provolone',
                smallPrice: '9.99',
                price: '10.99'
            }),
            new MenuItemModel({
                numeral: 3,
                name: '',
                menutype: 'SANDWICH',
                desciption: 'Mortadella, Salami, Provolone',
                smallPrice: '9.99',
                price: '10.99'
            }),
            new MenuItemModel({
                numeral: 4,
                name: '',
                menutype: 'SANDWICH',
                desciption: 'Turkey, Provolone',
                smallPrice: '9.99',
                price: '10.99'
            }),
            new MenuItemModel({
                numeral: 5,
                name: '',
                menutype: 'SANDWICH',
                desciption: 'Hot Capicola, Salami, Provolone',
                smallPrice: '9.99',
                price: '10.99'
            }),
            new MenuItemModel({
                numeral: 6,
                name: '',
                menutype: 'SANDWICH',
                desciption: 'Fresh Mozzarella, Basil, Tomato',
                smallPrice: '8.99',
                price: '9.99'
            }),
            new MenuItemModel({
                numeral: 7,
                name: '',
                menutype: 'SANDWICH',
                desciption: 'Speck, Mozzarella, Sun Dried Tomato, Pesto',
                smallPrice: '10.99',
                price: '11.99'
            }),
            new MenuItemModel({
                numeral: 8,
                name: '',
                menutype: 'SANDWICH',
                desciption: 'Turkey, Arugula, Artichoke, Avocado',
                smallPrice: '10.99',
                price: '11.99'
            }),
            new MenuItemModel({
                numeral: 9,
                name: '',
                menutype: 'SANDWICH',
                desciption: 'Pork, Turkey, Mayo, Mustard, Swiss, Pickle',
                smallPrice: '10.99',
                price: '11.99'
            }),
            new MenuItemModel({
                numeral: 10,
                name: '',
                menutype: 'SANDWICH',
                desciption: 'Casa Special Sopressata, Arugula, Mozzarella, Tomato on Multigrain with House Sauce & Roasted Red Peppers',
                smallPrice: '10.99',
                price: '11.99'
            }),
            new MenuItemModel({
                numeral: 15,
                name: '',
                menutype: 'BEVERAGE',
                desciption: 'Cappuccino',
                smallPrice: '',
                price: '4.25'
            }),
            new MenuItemModel({
                numeral: 16,
                name: '',
                menutype: 'BEVERAGE',
                desciption: 'Latte',
                smallPrice: '',
                price: '4.25'
            }),
            new MenuItemModel({
                numeral: 17,
                name: '',
                menutype: 'BEVERAGE',
                desciption: 'Espresso',
                smallPrice: '',
                price: '2.99'
            }),
            new MenuItemModel({
                numeral: 18,
                name: '',
                menutype: 'BEVERAGE',
                desciption: 'Espresso Macchiato',
                smallPrice: '',
                price: '3.50'
            }),
            new MenuItemModel({
                numeral: 19,
                name: '',
                menutype: 'BEVERAGE',
                desciption: 'Double Cappuccino',
                smallPrice: '',
                price: '4.59'
            }),
            new MenuItemModel({
                numeral: 20,
                name: '',
                menutype: 'BEVERAGE',
                desciption: 'Hot/Iced Tea',
                smallPrice: '',
                price: '2.99'
            }),
            new MenuItemModel({
                numeral: 21,
                name: '',
                menutype: 'BEVERAGE',
                desciption: 'Hot Chocolate',
                smallPrice: '',
                price: '3.29'
            }),
            new MenuItemModel({
                numeral: 22,
                name: '',
                menutype: 'BEVERAGE',
                desciption: 'Americano',
                smallPrice: '',
                price: '2.99'
            }),
            

        ]

        db.collection('menu_items').insertMany(menuItemArray)
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

import {MongoClient} from "mongodb";

import dotenv from 'dotenv'
const DB_CONFIG = dotenv.config({path: './.envdb'}).parsed;

import StoreHours from "./dao/store-hours.js";
import {MenuItemModel,MenuType} from "./dao/menu-item-model.js";
import OptionModel from "./dao/option-model.js";

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
            // db.collection('store_hours').insertMany(storeHoursArray)
            //     .then( res => {
            //         console.log(res.ops)
            //     })
            //     .catch(err => {
            //         console.error(err)
            //     })
                
        const menuItemArray = [
            new MenuItemModel({
                numeral: 1,
                name: '',
                menutype: MenuType.SANDWICH,
                desciption: 'Prosciutto, Fresh Mozzarella',
                smallPrice: '10.99',
                price: '11.99'
            }),
            new MenuItemModel({
                numeral: 2,
                name: '',
                menutype: MenuType.SANDWICH,
                desciption: 'Ham, Salami, Provolone',
                smallPrice: '9.99',
                price: '10.99'
            }),
            new MenuItemModel({
                numeral: 3,
                name: '',
                menutype: MenuType.SANDWICH,
                desciption: 'Mortadella, Salami, Provolone',
                smallPrice: '9.99',
                price: '10.99'
            }),
            new MenuItemModel({
                numeral: 4,
                name: '',
                menutype: MenuType.SANDWICH,
                desciption: 'Turkey, Provolone',
                smallPrice: '9.99',
                price: '10.99'
            }),
            new MenuItemModel({
                numeral: 5,
                name: '',
                menutype: MenuType.SANDWICH,
                desciption: 'Hot Capicola, Salami, Provolone',
                smallPrice: '9.99',
                price: '10.99'
            }),
            new MenuItemModel({
                numeral: 6,
                name: '',
                menutype: MenuType.SANDWICH,
                desciption: 'Fresh Mozzarella, Basil, Tomato',
                smallPrice: '8.99',
                price: '9.99'
            }),
            new MenuItemModel({
                numeral: 7,
                name: '',
                menutype: MenuType.SANDWICH,
                desciption: 'Speck, Mozzarella, Sun Dried Tomato, Pesto',
                smallPrice: '10.99',
                price: '11.99'
            }),
            new MenuItemModel({
                numeral: 8,
                name: '',
                menutype: MenuType.SANDWICH,
                desciption: 'Turkey, Arugula, Artichoke, Avocado',
                smallPrice: '10.99',
                price: '11.99'
            }),
            new MenuItemModel({
                numeral: 9,
                name: '',
                menutype: MenuType.SANDWICH,
                desciption: 'Pork, Turkey, Mayo, Mustard, Swiss, Pickle',
                smallPrice: '10.99',
                price: '11.99'
            }),
            new MenuItemModel({
                numeral: 10,
                name: '',
                menutype: MenuType.SANDWICH,
                desciption: 'Casa Special Sopressata, Arugula, Mozzarella, Tomato on Multigrain with House Sauce & Roasted Red Peppers',
                smallPrice: '10.99',
                price: '11.99'
            }),
            new MenuItemModel({
                numeral: 15,
                name: '',
                menutype: MenuType.BEVERAGE,
                desciption: 'Cappuccino',
                smallPrice: '',
                price: '4.25'
            }),
            new MenuItemModel({
                numeral: 16,
                name: '',
                menutype: MenuType.BEVERAGE,
                desciption: 'Latte',
                smallPrice: '',
                price: '4.25'
            }),
            new MenuItemModel({
                numeral: 17,
                name: '',
                menutype: MenuType.BEVERAGE,
                desciption: 'Espresso',
                smallPrice: '',
                price: '2.99'
            }),
            new MenuItemModel({
                numeral: 18,
                name: '',
                menutype: MenuType.BEVERAGE,
                desciption: 'Espresso Macchiato',
                smallPrice: '',
                price: '3.50'
            }),
            new MenuItemModel({
                numeral: 19,
                name: '',
                menutype: MenuType.BEVERAGE,
                desciption: 'Double Cappuccino',
                smallPrice: '',
                price: '4.59'
            }),
            new MenuItemModel({
                numeral: 20,
                name: '',
                menutype: MenuType.BEVERAGE,
                desciption: 'Hot/Iced Tea',
                smallPrice: '',
                price: '2.99'
            }),
            new MenuItemModel({
                numeral: 21,
                name: '',
                menutype: MenuType.BEVERAGE,
                desciption: 'Hot Chocolate',
                smallPrice: '',
                price: '3.29'
            }),
            new MenuItemModel({
                numeral: 22,
                name: '',
                menutype: MenuType.BEVERAGE,
                desciption: 'Americano',
                smallPrice: '',
                price: '2.99'
            }),
            new MenuItemModel({
                numeral: 28,
                name: 'Sandwich',
                menutype: MenuType.BREAKFAST,
                description: 'Egg, Ham, Provolone on Toasted Roll or Croissant',
                smallPrice: '',
                price: '9.99'}),
            new MenuItemModel({
                numeral: 29,
                name: 'Maddalena Special',
                menutype: MenuType.BREAKFAST,
                description: '2 Over Easy Eggs, Avocado, Basil, Mozzarella & Tomato on Choice of Bread',
                smallPrice: '',
                price: '9.99'}),
            new MenuItemModel({
                numeral: 30,
                name: 'Eggs',
                menutype: MenuType.BREAKFAST,
                description: '2 Eggs on Toast with Fruit',
                smallPrice: '',
                price: '9.99'}),
            new MenuItemModel({
                numeral: 31,
                name: 'Veggie Omelet',
                menutype: MenuType.BREAKFAST,
                description: '3 Eggs with Eggplant, Zucchini, Roasted Peppers & Mozzarella',
                smallPrice: '',
                price: '9.99'}),
            new MenuItemModel({
                numeral: 32,
                name: 'Ham and Cheese',
                menutype: MenuType.BREAKFAST,
                description: '3 Eggs with Ham & Provolone',
                smallPrice: '',
                price: '9.99'}),
            new MenuItemModel({
                numeral: 33,
                name: 'Cheese',
                menutype: MenuType.BREAKFAST,
                description: '3 Eggs with Provolone',
                smallPrice: '',
                price: '9.99'}),
            new MenuItemModel({
                numeral: 34,
                name: 'Egg White Omelet',
                menutype: MenuType.BREAKFAST,
                description: 'Arugula, Tomato & Mozzarella',
                smallPrice: '',
                price: '9.99'}),
            new MenuItemModel({
                numeral: 101,
                name: 'La Originale',
                menutype: MenuType.PIZZA,
                desciption: 'Tomato Sauce, Mozzarella Cheese',
                smallPrice: '13.99',
                price: '16.99'
            }),
            new MenuItemModel({
                numeral: 102,
                name: 'Caprese',
                menutype: MenuType.PIZZA,
                desciption: 'Fresh Tomato, Mozzarella, Basil',
                smallPrice: '15.99',
                price: '19.99'
            }),
            new MenuItemModel({
                numeral: 103,
                name: 'L\'Insalata di Pizza',
                menutype: MenuType.PIZZA,
                desciption: 'Fresh Tomato, Mozzarella, Basil',
                smallPrice: '15.99',
                price: '21.99'
            }),
            new MenuItemModel({
                numeral: 104,
                name: 'La Diavola',
                menutype: MenuType.PIZZA,
                desciption: 'Tomato Sauce, Mozzarella Cheese, Pepperoni',
                smallPrice: '16.99',
                price: '22.99'
            }),
            new MenuItemModel({
                numeral: 105,
                name: ' La Salizz',
                menutype: MenuType.PIZZA,
                desciption: 'Italian Sausage, Mozzarella, Tomato Sauce',
                smallPrice: '16.99',
                price: '22.99'
            }),
            new MenuItemModel({
                numeral: 106,
                name: 'Vegetarian',
                menutype: MenuType.PIZZA,
                desciption: 'Mozzarella, Olives, Green Pepper, Mushroom, Artichoke',
                smallPrice: '16.99',
                price: '22.99'
            }),
            new MenuItemModel({
                numeral: 107,
                name: 'Anna Special',
                menutype: MenuType.PIZZA,
                desciption: 'Turkey',
                smallPrice: '16.99',
                price: '22.99'
            }),
            new MenuItemModel({
                numeral: 108,
                name: 'Pizza Alla Nutella',
                menutype: MenuType.PIZZA,
                desciption: 'Turkey',
                smallPrice: '15.99',
                price: ''
            }),
            new MenuItemModel({
                numeral: 109,
                name: 'Altamura',
                menutype: MenuType.PIZZA,
                desciption: 'TuBresaola, Arugula, Mozzarella Cheese, Shaved Parigiano Cheese, Cherry Tomatorkey',
                smallPrice: '16.99',
                price: '23.99'
            }),
            new MenuItemModel({
                numeral: 401,
                name: 'Antipasto Salad',
                menutype: MenuType.SALAD,
                desciption: 'Mixed Lettuce with Grilled Eggplant, Zucchini, Artichoke, Roasted Peppers, Sun Dried Tomatoes and Mozzarella topped with Olive Oil and Balsamic Glaze',
                smallPrice: '11.99',
                price: '15.99'
            }),
            new MenuItemModel({
                numeral: 402,
                name: 'Italian Sushi',
                menutype: MenuType.SALAD,
                desciption: 'Turkey, Artichoke, Zucchini,Eggplant, Fresh Tomato, Basil, Provolone or Fresh Mozzarella Rolled on a Bed of Mixed Lettuce',
                smallPrice: '11.99',
                price: '15.99'
            }),
            new MenuItemModel({
                numeral: 403,
                name: 'Caprese Salad',
                menutype: MenuType.SALAD,
                desciption: 'TuBrFresh Tomato and Mozzarella topped with Fresh Basil, Olive Oil, and Balsamic Glazeesaola',
                smallPrice: '9.99',
                price: '13.99'
            }),
            new MenuItemModel({
                numeral: 404,
                name: 'Bresalo (Cured Beef) Salad',
                menutype: MenuType.SALAD,
                desciption: 'Bresalo over Arugula topped with Shaved Parmigiano Cheese, Lemon, black Pepper and Olive Oil',
                smallPrice: '',
                price: '15.99'
            }),
            new MenuItemModel({
                numeral: 501,
                name: '',
                menutype: MenuType.PASTRY,
                desciption: 'Chocolate Croissant',
                smallPrice: '',
                price: '4.00'
            }),
            new MenuItemModel({
                numeral: 502,
                name: '',
                menutype: MenuType.PASTRY,
                desciption: 'Strawberry & Cream Cheese Croissant',
                smallPrice: '',
                price: '4.00'
            }),
            new MenuItemModel({
                numeral: 503,
                name: '',
                menutype: MenuType.PASTRY,
                desciption: 'Cream Cheese Croissant',
                smallPrice: '',
                price: '4.00'
            }),
            new MenuItemModel({
                numeral: 504,
                name: '',
                menutype: MenuType.PASTRY,
                desciption: 'Plain Croissant',
                smallPrice: '',
                price: '4.00'
            }),
            new MenuItemModel({
                numeral: 505,
                name: '',
                menutype: MenuType.PASTRY,
                desciption: 'Creama Croissant',
                smallPrice: '',
                price: '4.00'
            }),
            new MenuItemModel({
                numeral: 506,
                name: '',
                menutype: MenuType.PASTRY,
                desciption: 'Muffins',
                smallPrice: '',
                price: '4.00'
            }),
            new MenuItemModel({
                numeral: 507,
                name: '',
                menutype: MenuType.PASTRY,
                desciption: 'Sfogliatella (Ricotta & Citrus Fruit)',
                smallPrice: '3.25',
                price: '4.00'
            }),
            new MenuItemModel({
                numeral: 508,
                name: '',
                menutype: MenuType.PASTRY,
                desciption: 'Lobster Tail with Custard & Cream',
                smallPrice: '',
                price: '4.00'
            }),
            new MenuItemModel({
                numeral: 509,
                name: '',
                menutype: MenuType.PASTRY,
                desciption: 'Cannoli with Ricotta & Chocolate Chip',
                smallPrice: '3.25',
                price: '4.00'
            }),
            new MenuItemModel({
                numeral: 510,
                name: '',
                menutype: MenuType.PASTRY,
                desciption: 'Chocolate Chip Cookie',
                smallPrice: '',
                price: '4.00'
            }),
            new MenuItemModel({
                numeral: 511,
                name: '',
                menutype: MenuType.PASTRY,
                desciption: 'Cinnamon Bun',
                smallPrice: '',
                price: '4.00'
            }),
            new MenuItemModel({
                numeral: 512,
                name: '',
                menutype: MenuType.PASTRY,
                desciption: 'Danish',
                smallPrice: '',
                price: '4.00'
            }),
        ]

        db.collection('menu_items').insertMany(menuItemArray)
        .then( res => {
            console.log('menu_items success')
        })
        .catch(err => {
            console.error(err)
        })

        const initialOptionsList = [
            new OptionModel({name: 'Lettuce', menuType: MenuType.SANDWICH, sortOrder: 1}),
            new OptionModel({name: 'Tomato', menuType: MenuType.SANDWICH, sortOrder: 2}),
            new OptionModel({name: 'Oil', menuType: MenuType.SANDWICH, sortOrder: 3}),
            new OptionModel({name: 'Vinegar', menuType: MenuType.SANDWICH, sortOrder: 4}),
            new OptionModel({name: 'Arugula', menuType: MenuType.SANDWICH, sortOrder: 5}),
            new OptionModel({name: 'Roasted Pepper', menuType: MenuType.SANDWICH, sortOrder: 6}),
            new OptionModel({name: 'Extra Mozzarella', menuType: MenuType.SANDWICH, sortOrder: 10, price: '2.75'}),
            new OptionModel({name: 'Fruitcup', menuType: MenuType.SANDWICH, sortOrder: 11, price: '4.95'}),
            new OptionModel({name: 'Avocado', menuType: MenuType.SANDWICH, sortOrder: 12, price: '2.25'}),
            new OptionModel({name: 'Heated', menuType: MenuType.SANDWICH, sortOrder: 22}),
            new OptionModel({name: 'Iced', menuType: MenuType.BEVERAGE, sortOrder: 1}),
            new OptionModel({name: 'Add Flavor', menuType: MenuType.BEVERAGE, sortOrder: 2}),
            new OptionModel({name: 'Almond Milk', menuType: MenuType.BEVERAGE, sortOrder: 20}),
            new OptionModel({name: 'Soy Milk', menuType: MenuType.BEVERAGE, sortOrder: 21}),
            new OptionModel({name: 'Coconut Milk', menuType: MenuType.BEVERAGE, sortOrder: 22}),
            new OptionModel({name: 'No Meat', menuType: MenuType.BREAKFAST, sortOrder: 1}),
            new OptionModel({name: 'No Cheese', menuType: MenuType.BREAKFAST, sortOrder: 2}),
            new OptionModel({name: 'No Eggs', menuType: MenuType.BREAKFAST, sortOrder: 3}),
          ];

          db.collection('options').insertMany(initialOptionsList)
          .then( res => {
              console.log('options success')
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
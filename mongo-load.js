import mongoose from 'mongoose';

import dotenv from 'dotenv'
// import { Int32 } from 'mongodb';
const DB_CONFIG = dotenv.config({ path: './.envdb' }).parsed;

import StoreHours from './models/storehours.js';
import MenuItem from './models/menu-item.js';
import Option from './models/option.js';

const main = async () => {
    await mongoose.connect(DB_CONFIG.LACASA_ADM_URL);
    console.log('Mongoose connected (db lacasa)');

    if (await StoreHours.estimatedDocumentCount().exec() > 0) {
        console.log('DATABASE ALREADY EXISTS');
        return;
    }

    const storeHoursArray = [
        new StoreHours({
            order: 1,
            day: 'Monday',
            from: -1,
            to: -1,
        }),
        new StoreHours({
            order: 2,
            day: 'Tuesday',
            from: 800,
            to: 1500,
        }),
        new StoreHours({
            order: 3,
            day: 'Wednesday',
            from: 800,
            to: 1500,
        }),
        new StoreHours({
            order: 4,
            day: 'Thursday',
            from: 800,
            to: 1500,
        }),
        new StoreHours({
            order: 5,
            day: 'Friday',
            from: 800,
            to: 1500,
        }),
        new StoreHours({
            order: 6,
            day: 'Saturday',
            from: 800,
            to: 1700,
        }),
        new StoreHours({
            order: 7,
            day: 'Sunday',
            from: 800,
            to: 1400,
        }),
    ]

    StoreHours.insertMany(storeHoursArray, function (err) {
        if (err) {
            console.log('Have an insertMany error:')
            console.log(err);
            return;
        }
        console.log('StoreHours inserted');
    })

    const MenuType = Object.freeze({
        SANDWICH: 'sandwich',
        BEVERAGE: 'beverage',
        BREAKFAST: 'breakfast',
        PIZZA: 'pizza',
        SALAD: 'salad',
        PASTRY: 'pastry',
    })

    const menuItemArray = [
        new MenuItem({
            sortOrder: 1,
            name: '',
            menutype: MenuType.SANDWICH,
            description: 'Prosciutto, Fresh Mozzarella',
            smallPrice: '10.99',
            price: '11.99'
        }),
        new MenuItem({
            sortOrder: 2,
            name: '',
            menutype: MenuType.SANDWICH,
            description: 'Ham, Salami, Provolone',
            smallPrice: '9.99',
            price: '10.99'
        }),
        new MenuItem({
            sortOrder: 3,
            name: '',
            menutype: MenuType.SANDWICH,
            description: 'Mortadella, Salami, Provolone',
            smallPrice: '9.99',
            price: '10.99'
        }),
        new MenuItem({
            sortOrder: 4,
            name: '',
            menutype: MenuType.SANDWICH,
            description: 'Turkey, Provolone',
            smallPrice: '9.99',
            price: '10.99'
        }),
        new MenuItem({
            sortOrder: 5,
            name: '',
            menutype: MenuType.SANDWICH,
            description: 'Hot Capicola, Salami, Provolone',
            smallPrice: '9.99',
            price: '10.99'
        }),
        new MenuItem({
            sortOrder: 6,
            name: '',
            menutype: MenuType.SANDWICH,
            description: 'Fresh Mozzarella, Basil, Tomato',
            smallPrice: '8.99',
            price: '9.99'
        }),
        new MenuItem({
            sortOrder: 7,
            name: '',
            menutype: MenuType.SANDWICH,
            description: 'Speck, Mozzarella, Sun Dried Tomato, Pesto',
            smallPrice: '10.99',
            price: '11.99'
        }),
        new MenuItem({
            sortOrder: 8,
            name: '',
            menutype: MenuType.SANDWICH,
            description: 'Turkey, Arugula, Artichoke, Avocado',
            smallPrice: '10.99',
            price: '11.99'
        }),
        new MenuItem({
            sortOrder: 9,
            name: '',
            menutype: MenuType.SANDWICH,
            description: 'Pork, Turkey, Mayo, Mustard, Swiss, Pickle',
            smallPrice: '10.99',
            price: '11.99'
        }),
        new MenuItem({
            sortOrder: 10,
            name: '',
            menutype: MenuType.SANDWICH,
            description: 'Casa Special Sopressata, Arugula, Mozzarella, Tomato on Multigrain with House Sauce & Roasted Red Peppers',
            smallPrice: '10.99',
            price: '11.99'
        }),
        new MenuItem({
            sortOrder: 15,
            name: '',
            menutype: MenuType.BEVERAGE,
            description: 'Cappuccino',
            smallPrice: '',
            price: '4.25'
        }),
        new MenuItem({
            sortOrder: 16,
            name: '',
            menutype: MenuType.BEVERAGE,
            description: 'Latte',
            smallPrice: '',
            price: '4.25'
        }),
        new MenuItem({
            sortOrder: 17,
            name: '',
            menutype: MenuType.BEVERAGE,
            description: 'Espresso',
            smallPrice: '',
            price: '2.99'
        }),
        new MenuItem({
            sortOrder: 18,
            name: '',
            menutype: MenuType.BEVERAGE,
            description: 'Espresso Macchiato',
            smallPrice: '',
            price: '3.50'
        }),
        new MenuItem({
            sortOrder: 19,
            name: '',
            menutype: MenuType.BEVERAGE,
            description: 'Double Cappuccino',
            smallPrice: '',
            price: '4.59'
        }),
        new MenuItem({
            sortOrder: 20,
            name: '',
            menutype: MenuType.BEVERAGE,
            description: 'Hot/Iced Tea',
            smallPrice: '',
            price: '2.99'
        }),
        new MenuItem({
            sortOrder: 21,
            name: '',
            menutype: MenuType.BEVERAGE,
            description: 'Hot Chocolate',
            smallPrice: '',
            price: '3.29'
        }),
        new MenuItem({
            sortOrder: 22,
            name: '',
            menutype: MenuType.BEVERAGE,
            description: 'Americano',
            smallPrice: '',
            price: '2.99'
        }),
        new MenuItem({
            sortOrder: 28,
            name: 'Sandwich',
            menutype: MenuType.BREAKFAST,
            description: 'Egg, Ham, Provolone on Toasted Roll or Croissant',
            smallPrice: '',
            price: '9.99'
        }),
        new MenuItem({
            sortOrder: 29,
            name: 'Maddalena Special',
            menutype: MenuType.BREAKFAST,
            description: '2 Over Easy Eggs, Avocado, Basil, Mozzarella & Tomato on Choice of Bread',
            smallPrice: '',
            price: '9.99'
        }),
        new MenuItem({
            sortOrder: 30,
            name: 'Eggs',
            menutype: MenuType.BREAKFAST,
            description: '2 Eggs on Toast with Fruit',
            smallPrice: '',
            price: '9.99'
        }),
        new MenuItem({
            sortOrder: 31,
            name: 'Veggie Omelet',
            menutype: MenuType.BREAKFAST,
            description: '3 Eggs with Eggplant, Zucchini, Roasted Peppers & Mozzarella',
            smallPrice: '',
            price: '9.99'
        }),
        new MenuItem({
            sortOrder: 32,
            name: 'Ham and Cheese',
            menutype: MenuType.BREAKFAST,
            description: '3 Eggs with Ham & Provolone',
            smallPrice: '',
            price: '9.99'
        }),
        new MenuItem({
            sortOrder: 33,
            name: 'Cheese',
            menutype: MenuType.BREAKFAST,
            description: '3 Eggs with Provolone',
            smallPrice: '',
            price: '9.99'
        }),
        new MenuItem({
            sortOrder: 34,
            name: 'Egg White Omelet',
            menutype: MenuType.BREAKFAST,
            description: 'Arugula, Tomato & Mozzarella',
            smallPrice: '',
            price: '9.99'
        }),
        new MenuItem({
            sortOrder: 101,
            name: 'La Originale',
            menutype: MenuType.PIZZA,
            description: 'Tomato Sauce, Mozzarella Cheese',
            smallPrice: '13.99',
            price: '16.99'
        }),
        new MenuItem({
            sortOrder: 102,
            name: 'Caprese',
            menutype: MenuType.PIZZA,
            description: 'Fresh Tomato, Mozzarella, Basil',
            smallPrice: '15.99',
            price: '19.99'
        }),
        new MenuItem({
            sortOrder: 103,
            name: 'L\'Insalata di Pizza',
            menutype: MenuType.PIZZA,
            description: 'Fresh Tomato, Mozzarella, Basil',
            smallPrice: '15.99',
            price: '21.99'
        }),
        new MenuItem({
            sortOrder: 104,
            name: 'La Diavola',
            menutype: MenuType.PIZZA,
            description: 'Tomato Sauce, Mozzarella Cheese, Pepperoni',
            smallPrice: '16.99',
            price: '22.99'
        }),
        new MenuItem({
            sortOrder: 105,
            name: ' La Salizz',
            menutype: MenuType.PIZZA,
            description: 'Italian Sausage, Mozzarella, Tomato Sauce',
            smallPrice: '16.99',
            price: '22.99'
        }),
        new MenuItem({
            sortOrder: 106,
            name: 'Vegetarian',
            menutype: MenuType.PIZZA,
            description: 'Mozzarella, Olives, Green Pepper, Mushroom, Artichoke',
            smallPrice: '16.99',
            price: '22.99'
        }),
        new MenuItem({
            sortOrder: 107,
            name: 'Anna Special',
            menutype: MenuType.PIZZA,
            description: 'Turkey',
            smallPrice: '16.99',
            price: '22.99'
        }),
        new MenuItem({
            sortOrder: 108,
            name: 'Pizza Alla Nutella',
            menutype: MenuType.PIZZA,
            description: 'Turkey',
            smallPrice: '15.99',
            price: ''
        }),
        new MenuItem({
            sortOrder: 109,
            name: 'Altamura',
            menutype: MenuType.PIZZA,
            description: 'TuBresaola, Arugula, Mozzarella Cheese, Shaved Parigiano Cheese, Cherry Tomatorkey',
            smallPrice: '16.99',
            price: '23.99'
        }),
        new MenuItem({
            sortOrder: 401,
            name: 'Antipasto Salad',
            menutype: MenuType.SALAD,
            description: 'Mixed Lettuce with Grilled Eggplant, Zucchini, Artichoke, Roasted Peppers, Sun Dried Tomatoes and Mozzarella topped with Olive Oil and Balsamic Glaze',
            smallPrice: '11.99',
            price: '15.99'
        }),
        new MenuItem({
            sortOrder: 402,
            name: 'Italian Sushi',
            menutype: MenuType.SALAD,
            description: 'Turkey, Artichoke, Zucchini,Eggplant, Fresh Tomato, Basil, Provolone or Fresh Mozzarella Rolled on a Bed of Mixed Lettuce',
            smallPrice: '11.99',
            price: '15.99'
        }),
        new MenuItem({
            sortOrder: 403,
            name: 'Caprese Salad',
            menutype: MenuType.SALAD,
            description: 'TuBrFresh Tomato and Mozzarella topped with Fresh Basil, Olive Oil, and Balsamic Glazeesaola',
            smallPrice: '9.99',
            price: '13.99'
        }),
        new MenuItem({
            sortOrder: 404,
            name: 'Bresalo (Cured Beef) Salad',
            menutype: MenuType.SALAD,
            description: 'Bresalo over Arugula topped with Shaved Parmigiano Cheese, Lemon, black Pepper and Olive Oil',
            smallPrice: '',
            price: '15.99'
        }),
        new MenuItem({
            sortOrder: 501,
            name: '',
            menutype: MenuType.PASTRY,
            description: 'Chocolate Croissant',
            smallPrice: '',
            price: '4.00'
        }),
        new MenuItem({
            sortOrder: 502,
            name: '',
            menutype: MenuType.PASTRY,
            description: 'Strawberry & Cream Cheese Croissant',
            smallPrice: '',
            price: '4.00'
        }),
        new MenuItem({
            sortOrder: 503,
            name: '',
            menutype: MenuType.PASTRY,
            description: 'Cream Cheese Croissant',
            smallPrice: '',
            price: '4.00'
        }),
        new MenuItem({
            sortOrder: 504,
            name: '',
            menutype: MenuType.PASTRY,
            description: 'Plain Croissant',
            smallPrice: '',
            price: '4.00'
        }),
        new MenuItem({
            sortOrder: 505,
            name: '',
            menutype: MenuType.PASTRY,
            description: 'Creama Croissant',
            smallPrice: '',
            price: '4.00'
        }),
        new MenuItem({
            sortOrder: 506,
            name: '',
            menutype: MenuType.PASTRY,
            description: 'Muffins',
            smallPrice: '',
            price: '4.00'
        }),
        new MenuItem({
            sortOrder: 507,
            name: '',
            menutype: MenuType.PASTRY,
            description: 'Sfogliatella (Ricotta & Citrus Fruit)',
            smallPrice: '3.25',
            price: '4.00'
        }),
        new MenuItem({
            sortOrder: 508,
            name: '',
            menutype: MenuType.PASTRY,
            description: 'Lobster Tail with Custard & Cream',
            smallPrice: '',
            price: '4.00'
        }),
        new MenuItem({
            sortOrder: 509,
            name: '',
            menutype: MenuType.PASTRY,
            description: 'Cannoli with Ricotta & Chocolate Chip',
            smallPrice: '3.25',
            price: '4.00'
        }),
        new MenuItem({
            sortOrder: 510,
            name: '',
            menutype: MenuType.PASTRY,
            description: 'Chocolate Chip Cookie',
            smallPrice: '',
            price: '4.00'
        }),
        new MenuItem({
            sortOrder: 511,
            name: '',
            menutype: MenuType.PASTRY,
            description: 'Cinnamon Bun',
            smallPrice: '',
            price: '4.00'
        }),
        new MenuItem({
            sortOrder: 512,
            name: '',
            menutype: MenuType.PASTRY,
            description: 'Danish',
            smallPrice: '',
            price: '4.00'
        }),
    ]

    MenuItem.insertMany(menuItemArray, function (err) {
        if (err) {
            console.log('Have an insertMany error:')
            console.log(err);
            return;
        }
        console.log('MenuItems inserted');
    });

    const initialOptionList = [
        new Option({ name: 'Lettuce', menutype: MenuType.SANDWICH, sortOrder: 1 }),
        new Option({ name: 'Tomato', menutype: MenuType.SANDWICH, sortOrder: 2 }),
        new Option({ name: 'Oil', menutype: MenuType.SANDWICH, sortOrder: 3 }),
        new Option({ name: 'Vinegar', menutype: MenuType.SANDWICH, sortOrder: 4 }),
        new Option({ name: 'Arugula', menutype: MenuType.SANDWICH, sortOrder: 5 }),
        new Option({ name: 'Roasted Pepper', menutype: MenuType.SANDWICH, sortOrder: 6 }),
        new Option({ name: 'Extra Mozzarella', menutype: MenuType.SANDWICH, sortOrder: 10, price: '2.75' }),
        new Option({ name: 'Fruitcup', menutype: MenuType.SANDWICH, sortOrder: 11, price: '4.95' }),
        new Option({ name: 'Avocado', menutype: MenuType.SANDWICH, sortOrder: 12, price: '2.25' }),
        new Option({ name: 'Heated', menutype: MenuType.SANDWICH, sortOrder: 22 }),
        new Option({ name: 'Iced', menutype: MenuType.BEVERAGE, sortOrder: 1 }),
        new Option({ name: 'Add Flavor', menutype: MenuType.BEVERAGE, sortOrder: 2 }),
        new Option({ name: 'Almond Milk', menutype: MenuType.BEVERAGE, sortOrder: 20 }),
        new Option({ name: 'Soy Milk', menutype: MenuType.BEVERAGE, sortOrder: 21 }),
        new Option({ name: 'Coconut Milk', menutype: MenuType.BEVERAGE, sortOrder: 22 }),
        new Option({ name: 'No Meat', menutype: MenuType.BREAKFAST, sortOrder: 1 }),
        new Option({ name: 'No Cheese', menutype: MenuType.BREAKFAST, sortOrder: 2 }),
        new Option({ name: 'No Eggs', menutype: MenuType.BREAKFAST, sortOrder: 3 }),
    ];

    Option.insertMany(initialOptionList, function (err) {
        if (err) {
            console.log('Have an insertMany error:')
            console.log(err);
            return;
        }
        console.log('Options inserted');
    });

}

main().catch(err => console.log(err));
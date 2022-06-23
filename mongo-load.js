import mongoose from 'mongoose';

import dotenv from 'dotenv'
// import { Int32 } from 'mongodb';
const DB_CONFIG = dotenv.config({ path: './.envdb' }).parsed;

const main = async () => {
    await mongoose.connect(DB_CONFIG.LACASA_ADM_URL);
    console.log('Mongoose connected (db lacasa)');

    const storeHoursSchema = new mongoose.Schema({
        order: Number,
        day: String,
        from: Number,
        to: Number,
    });

    const StoreHours = mongoose.model('StoreHours', storeHoursSchema);

    if (await StoreHours.count().exec() > 0) {
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

    const menuItemSchema = new mongoose.Schema({
        numeral: Number,
        name: String,
        menutype: String,
        desciption: String,
        smallPrice: String,
        price: String,
    });

    const MenuItem = mongoose.model('MenuItem', menuItemSchema);

    const menuItemArray = [
        new MenuItem({
            numeral: 1,
            name: '',
            menutype: MenuType.SANDWICH,
            desciption: 'Prosciutto, Fresh Mozzarella',
            smallPrice: '10.99',
            price: '11.99'
        }),
        new MenuItem({
            numeral: 2,
            name: '',
            menutype: MenuType.SANDWICH,
            desciption: 'Ham, Salami, Provolone',
            smallPrice: '9.99',
            price: '10.99'
        }),
        new MenuItem({
            numeral: 3,
            name: '',
            menutype: MenuType.SANDWICH,
            desciption: 'Mortadella, Salami, Provolone',
            smallPrice: '9.99',
            price: '10.99'
        }),
        new MenuItem({
            numeral: 4,
            name: '',
            menutype: MenuType.SANDWICH,
            desciption: 'Turkey, Provolone',
            smallPrice: '9.99',
            price: '10.99'
        }),
        new MenuItem({
            numeral: 5,
            name: '',
            menutype: MenuType.SANDWICH,
            desciption: 'Hot Capicola, Salami, Provolone',
            smallPrice: '9.99',
            price: '10.99'
        }),
        new MenuItem({
            numeral: 6,
            name: '',
            menutype: MenuType.SANDWICH,
            desciption: 'Fresh Mozzarella, Basil, Tomato',
            smallPrice: '8.99',
            price: '9.99'
        }),
        new MenuItem({
            numeral: 7,
            name: '',
            menutype: MenuType.SANDWICH,
            desciption: 'Speck, Mozzarella, Sun Dried Tomato, Pesto',
            smallPrice: '10.99',
            price: '11.99'
        }),
        new MenuItem({
            numeral: 8,
            name: '',
            menutype: MenuType.SANDWICH,
            desciption: 'Turkey, Arugula, Artichoke, Avocado',
            smallPrice: '10.99',
            price: '11.99'
        }),
        new MenuItem({
            numeral: 9,
            name: '',
            menutype: MenuType.SANDWICH,
            desciption: 'Pork, Turkey, Mayo, Mustard, Swiss, Pickle',
            smallPrice: '10.99',
            price: '11.99'
        }),
        new MenuItem({
            numeral: 10,
            name: '',
            menutype: MenuType.SANDWICH,
            desciption: 'Casa Special Sopressata, Arugula, Mozzarella, Tomato on Multigrain with House Sauce & Roasted Red Peppers',
            smallPrice: '10.99',
            price: '11.99'
        }),
        new MenuItem({
            numeral: 15,
            name: '',
            menutype: MenuType.BEVERAGE,
            desciption: 'Cappuccino',
            smallPrice: '',
            price: '4.25'
        }),
        new MenuItem({
            numeral: 16,
            name: '',
            menutype: MenuType.BEVERAGE,
            desciption: 'Latte',
            smallPrice: '',
            price: '4.25'
        }),
        new MenuItem({
            numeral: 17,
            name: '',
            menutype: MenuType.BEVERAGE,
            desciption: 'Espresso',
            smallPrice: '',
            price: '2.99'
        }),
        new MenuItem({
            numeral: 18,
            name: '',
            menutype: MenuType.BEVERAGE,
            desciption: 'Espresso Macchiato',
            smallPrice: '',
            price: '3.50'
        }),
        new MenuItem({
            numeral: 19,
            name: '',
            menutype: MenuType.BEVERAGE,
            desciption: 'Double Cappuccino',
            smallPrice: '',
            price: '4.59'
        }),
        new MenuItem({
            numeral: 20,
            name: '',
            menutype: MenuType.BEVERAGE,
            desciption: 'Hot/Iced Tea',
            smallPrice: '',
            price: '2.99'
        }),
        new MenuItem({
            numeral: 21,
            name: '',
            menutype: MenuType.BEVERAGE,
            desciption: 'Hot Chocolate',
            smallPrice: '',
            price: '3.29'
        }),
        new MenuItem({
            numeral: 22,
            name: '',
            menutype: MenuType.BEVERAGE,
            desciption: 'Americano',
            smallPrice: '',
            price: '2.99'
        }),
        new MenuItem({
            numeral: 28,
            name: 'Sandwich',
            menutype: MenuType.BREAKFAST,
            description: 'Egg, Ham, Provolone on Toasted Roll or Croissant',
            smallPrice: '',
            price: '9.99'
        }),
        new MenuItem({
            numeral: 29,
            name: 'Maddalena Special',
            menutype: MenuType.BREAKFAST,
            description: '2 Over Easy Eggs, Avocado, Basil, Mozzarella & Tomato on Choice of Bread',
            smallPrice: '',
            price: '9.99'
        }),
        new MenuItem({
            numeral: 30,
            name: 'Eggs',
            menutype: MenuType.BREAKFAST,
            description: '2 Eggs on Toast with Fruit',
            smallPrice: '',
            price: '9.99'
        }),
        new MenuItem({
            numeral: 31,
            name: 'Veggie Omelet',
            menutype: MenuType.BREAKFAST,
            description: '3 Eggs with Eggplant, Zucchini, Roasted Peppers & Mozzarella',
            smallPrice: '',
            price: '9.99'
        }),
        new MenuItem({
            numeral: 32,
            name: 'Ham and Cheese',
            menutype: MenuType.BREAKFAST,
            description: '3 Eggs with Ham & Provolone',
            smallPrice: '',
            price: '9.99'
        }),
        new MenuItem({
            numeral: 33,
            name: 'Cheese',
            menutype: MenuType.BREAKFAST,
            description: '3 Eggs with Provolone',
            smallPrice: '',
            price: '9.99'
        }),
        new MenuItem({
            numeral: 34,
            name: 'Egg White Omelet',
            menutype: MenuType.BREAKFAST,
            description: 'Arugula, Tomato & Mozzarella',
            smallPrice: '',
            price: '9.99'
        }),
        new MenuItem({
            numeral: 101,
            name: 'La Originale',
            menutype: MenuType.PIZZA,
            desciption: 'Tomato Sauce, Mozzarella Cheese',
            smallPrice: '13.99',
            price: '16.99'
        }),
        new MenuItem({
            numeral: 102,
            name: 'Caprese',
            menutype: MenuType.PIZZA,
            desciption: 'Fresh Tomato, Mozzarella, Basil',
            smallPrice: '15.99',
            price: '19.99'
        }),
        new MenuItem({
            numeral: 103,
            name: 'L\'Insalata di Pizza',
            menutype: MenuType.PIZZA,
            desciption: 'Fresh Tomato, Mozzarella, Basil',
            smallPrice: '15.99',
            price: '21.99'
        }),
        new MenuItem({
            numeral: 104,
            name: 'La Diavola',
            menutype: MenuType.PIZZA,
            desciption: 'Tomato Sauce, Mozzarella Cheese, Pepperoni',
            smallPrice: '16.99',
            price: '22.99'
        }),
        new MenuItem({
            numeral: 105,
            name: ' La Salizz',
            menutype: MenuType.PIZZA,
            desciption: 'Italian Sausage, Mozzarella, Tomato Sauce',
            smallPrice: '16.99',
            price: '22.99'
        }),
        new MenuItem({
            numeral: 106,
            name: 'Vegetarian',
            menutype: MenuType.PIZZA,
            desciption: 'Mozzarella, Olives, Green Pepper, Mushroom, Artichoke',
            smallPrice: '16.99',
            price: '22.99'
        }),
        new MenuItem({
            numeral: 107,
            name: 'Anna Special',
            menutype: MenuType.PIZZA,
            desciption: 'Turkey',
            smallPrice: '16.99',
            price: '22.99'
        }),
        new MenuItem({
            numeral: 108,
            name: 'Pizza Alla Nutella',
            menutype: MenuType.PIZZA,
            desciption: 'Turkey',
            smallPrice: '15.99',
            price: ''
        }),
        new MenuItem({
            numeral: 109,
            name: 'Altamura',
            menutype: MenuType.PIZZA,
            desciption: 'TuBresaola, Arugula, Mozzarella Cheese, Shaved Parigiano Cheese, Cherry Tomatorkey',
            smallPrice: '16.99',
            price: '23.99'
        }),
        new MenuItem({
            numeral: 401,
            name: 'Antipasto Salad',
            menutype: MenuType.SALAD,
            desciption: 'Mixed Lettuce with Grilled Eggplant, Zucchini, Artichoke, Roasted Peppers, Sun Dried Tomatoes and Mozzarella topped with Olive Oil and Balsamic Glaze',
            smallPrice: '11.99',
            price: '15.99'
        }),
        new MenuItem({
            numeral: 402,
            name: 'Italian Sushi',
            menutype: MenuType.SALAD,
            desciption: 'Turkey, Artichoke, Zucchini,Eggplant, Fresh Tomato, Basil, Provolone or Fresh Mozzarella Rolled on a Bed of Mixed Lettuce',
            smallPrice: '11.99',
            price: '15.99'
        }),
        new MenuItem({
            numeral: 403,
            name: 'Caprese Salad',
            menutype: MenuType.SALAD,
            desciption: 'TuBrFresh Tomato and Mozzarella topped with Fresh Basil, Olive Oil, and Balsamic Glazeesaola',
            smallPrice: '9.99',
            price: '13.99'
        }),
        new MenuItem({
            numeral: 404,
            name: 'Bresalo (Cured Beef) Salad',
            menutype: MenuType.SALAD,
            desciption: 'Bresalo over Arugula topped with Shaved Parmigiano Cheese, Lemon, black Pepper and Olive Oil',
            smallPrice: '',
            price: '15.99'
        }),
        new MenuItem({
            numeral: 501,
            name: '',
            menutype: MenuType.PASTRY,
            desciption: 'Chocolate Croissant',
            smallPrice: '',
            price: '4.00'
        }),
        new MenuItem({
            numeral: 502,
            name: '',
            menutype: MenuType.PASTRY,
            desciption: 'Strawberry & Cream Cheese Croissant',
            smallPrice: '',
            price: '4.00'
        }),
        new MenuItem({
            numeral: 503,
            name: '',
            menutype: MenuType.PASTRY,
            desciption: 'Cream Cheese Croissant',
            smallPrice: '',
            price: '4.00'
        }),
        new MenuItem({
            numeral: 504,
            name: '',
            menutype: MenuType.PASTRY,
            desciption: 'Plain Croissant',
            smallPrice: '',
            price: '4.00'
        }),
        new MenuItem({
            numeral: 505,
            name: '',
            menutype: MenuType.PASTRY,
            desciption: 'Creama Croissant',
            smallPrice: '',
            price: '4.00'
        }),
        new MenuItem({
            numeral: 506,
            name: '',
            menutype: MenuType.PASTRY,
            desciption: 'Muffins',
            smallPrice: '',
            price: '4.00'
        }),
        new MenuItem({
            numeral: 507,
            name: '',
            menutype: MenuType.PASTRY,
            desciption: 'Sfogliatella (Ricotta & Citrus Fruit)',
            smallPrice: '3.25',
            price: '4.00'
        }),
        new MenuItem({
            numeral: 508,
            name: '',
            menutype: MenuType.PASTRY,
            desciption: 'Lobster Tail with Custard & Cream',
            smallPrice: '',
            price: '4.00'
        }),
        new MenuItem({
            numeral: 509,
            name: '',
            menutype: MenuType.PASTRY,
            desciption: 'Cannoli with Ricotta & Chocolate Chip',
            smallPrice: '3.25',
            price: '4.00'
        }),
        new MenuItem({
            numeral: 510,
            name: '',
            menutype: MenuType.PASTRY,
            desciption: 'Chocolate Chip Cookie',
            smallPrice: '',
            price: '4.00'
        }),
        new MenuItem({
            numeral: 511,
            name: '',
            menutype: MenuType.PASTRY,
            desciption: 'Cinnamon Bun',
            smallPrice: '',
            price: '4.00'
        }),
        new MenuItem({
            numeral: 512,
            name: '',
            menutype: MenuType.PASTRY,
            desciption: 'Danish',
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

    const optionSchema = new mongoose.Schema({
        numeral: Number,
        name: String,
        menutype: String,
        desciption: String,
        smallPrice: String,
        price: String,
    });

    const Option = mongoose.model('Option', optionSchema);

    const initialOptionList = [
        new Option({ name: 'Lettuce', menuType: MenuType.SANDWICH, sortOrder: 1 }),
        new Option({ name: 'Tomato', menuType: MenuType.SANDWICH, sortOrder: 2 }),
        new Option({ name: 'Oil', menuType: MenuType.SANDWICH, sortOrder: 3 }),
        new Option({ name: 'Vinegar', menuType: MenuType.SANDWICH, sortOrder: 4 }),
        new Option({ name: 'Arugula', menuType: MenuType.SANDWICH, sortOrder: 5 }),
        new Option({ name: 'Roasted Pepper', menuType: MenuType.SANDWICH, sortOrder: 6 }),
        new Option({ name: 'Extra Mozzarella', menuType: MenuType.SANDWICH, sortOrder: 10, price: '2.75' }),
        new Option({ name: 'Fruitcup', menuType: MenuType.SANDWICH, sortOrder: 11, price: '4.95' }),
        new Option({ name: 'Avocado', menuType: MenuType.SANDWICH, sortOrder: 12, price: '2.25' }),
        new Option({ name: 'Heated', menuType: MenuType.SANDWICH, sortOrder: 22 }),
        new Option({ name: 'Iced', menuType: MenuType.BEVERAGE, sortOrder: 1 }),
        new Option({ name: 'Add Flavor', menuType: MenuType.BEVERAGE, sortOrder: 2 }),
        new Option({ name: 'Almond Milk', menuType: MenuType.BEVERAGE, sortOrder: 20 }),
        new Option({ name: 'Soy Milk', menuType: MenuType.BEVERAGE, sortOrder: 21 }),
        new Option({ name: 'Coconut Milk', menuType: MenuType.BEVERAGE, sortOrder: 22 }),
        new Option({ name: 'No Meat', menuType: MenuType.BREAKFAST, sortOrder: 1 }),
        new Option({ name: 'No Cheese', menuType: MenuType.BREAKFAST, sortOrder: 2 }),
        new Option({ name: 'No Eggs', menuType: MenuType.BREAKFAST, sortOrder: 3 }),
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
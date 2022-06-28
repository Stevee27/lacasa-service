import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
    sortOrder: Number,
    name: String,
    menutype: String,
    description: String,
    smallPrice: String,
    price: String,
})

export default mongoose.model('MenuItem', MenuItemSchema);
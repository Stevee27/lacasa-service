import mongoose from 'mongoose';

const OptionSchema = new mongoose.Schema({
    numeral: Number,
    name: String,
    menutype: String,
    desciption: String,
    smallPrice: String,
    price: String,
})

export default mongoose.model('Option', OptionSchema);
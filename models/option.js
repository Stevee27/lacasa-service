import mongoose from 'mongoose';

const OptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    menutype: {
        type: String,
        required: true
    },
    sortOrder: {
        type: Number,
        required: true
    },
    price: String,
})

export default mongoose.model('Option', OptionSchema);
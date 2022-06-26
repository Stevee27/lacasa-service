import mongoose from 'mongoose';

const StoreHoursSchema = new mongoose.Schema({
    order: Number,
    day: String,
    from: Number,
    to: Number,
})

export default mongoose.model('StoreHours', StoreHoursSchema);
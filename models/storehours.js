import mongoose from 'mongoose';

const StoreHoursSchema = new mongoose.Schema({
    order: Number,
    dayOfWeek: String,
    from: String,
    to: String,
})

export default mongoose.model('StoreHours', StoreHoursSchema);
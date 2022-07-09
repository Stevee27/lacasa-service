import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema({
    token: String,
    username: String,
})

export default mongoose.model('Token', TokenSchema);
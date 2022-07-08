import mongoose from 'mongoose';

const AuthenticationSchema = new mongoose.Schema({
    username: String,
    passwd: String,
})

export default mongoose.model('Authentication', AuthenticationSchema);
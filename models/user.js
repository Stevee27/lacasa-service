import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    roles: String
})

export default mongoose.model('User', UserSchema);
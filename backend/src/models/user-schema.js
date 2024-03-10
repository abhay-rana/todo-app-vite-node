import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    googleId: String,
    name: String,
    photoUrl: String,
    password: String,
});

export const UserDb = mongoose.model('users', userSchema);

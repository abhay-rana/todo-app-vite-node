import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    googleId: String,
    name: String,
    photoUrl: String,
    password: String,
    socialLoginId: String, // it stores all the social login id in the single key "googleId" | "githubId"
    method: String, // "email | "mobile | "github | "google"
});

export const UserDb = mongoose.model('users', userSchema);

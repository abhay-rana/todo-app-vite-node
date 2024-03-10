import express from 'express';
import jwt from 'jsonwebtoken';
import {
    ChangePassword,
    GenerateNewAccessToken,
    LoginUser,
    LogoutUser,
    SignupUser,
} from '../controllers/user-controllers.js';
import { Authorize } from '../middlewares/authorize-middleware.js';
import passport from 'passport';
import { JWT_TOKEN } from '../../env.js';
import { UserDb } from '../models/user-schema.js';

const user_routes = express.Router();

user_routes.route('/signup').post(SignupUser);
user_routes.route('/login').post(LoginUser);
user_routes.route('/change-password').post(Authorize, ChangePassword);
user_routes.route('/refresh').get(Authorize, GenerateNewAccessToken);
user_routes.route('/logout').get(LogoutUser);
user_routes
    .route('/auth/google')
    .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

user_routes.route('/auth/google/callback').get(
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: false,
    }),
    async (req, res) => {
        try {
            // Assuming passport.authenticate('google') attaches the user data to req.user
            const user = req.user;

            if (!user) {
                throw new Error('User not found');
            }

            // Set the user data in the request object
            req.userData = user;

            const saved_user = await saveUser(user);
            const user_details = {
                id: saved_user._id,
                username: saved_user.name,
            };

            // const token=jwt.sign({id:user._id,username:user.username},JWT_TOKEN,{expiresIn: "30s"});
            const token = jwt.sign(user_details, JWT_TOKEN, {
                expiresIn: '1d',
            });

            console.log({ user });
            res.redirect(
                `http://localhost:3000/oauth-redirecting?token=${token}`
            );

            // Respond with JWT token
            res.json({ token });
        } catch (error) {
            console.log('cant get the url', error);
            res.status(500).json({ error: error.message });
        }
    }
);

// Save user data to database
const saveUser = async (userData) => {
    try {
        // Check if user already exists in database
        let user = await UserDb.findOne({ googleId: userData.id });

        // If user doesn't exist, create a new user
        if (!user) {
            user = new UserDb({
                googleId: userData.id,
                email: userData._json.email,
                name: userData._json.name,
                photoUrl: userData._json.picture,
                // Set other fields as needed
            });
            await user.save();
        }

        // Return the user object
        return user;
    } catch (error) {
        console.error('Error saving user:', error);
        throw error;
    }
};

export default user_routes;

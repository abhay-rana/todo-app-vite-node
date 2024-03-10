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

const user_routes = express.Router();

user_routes.route('/signup').post(SignupUser);
user_routes.route('/login').post(LoginUser);
user_routes.route('/change-password').post(Authorize, ChangePassword);
user_routes.route('/refresh').get(Authorize, GenerateNewAccessToken);
user_routes.route('/logout').get(Authorize, LogoutUser);
user_routes
    .route('/auth/google')
    .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

user_routes.route('/auth/google/callback').get(
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: false,
    }),
    (req, res) => {
        try {
            // Assuming passport.authenticate('google') attaches the user data to req.user
            const user = req.user;

            if (!user) {
                throw new Error('User not found');
            }

            // Set the user data in the request object
            req.userData = user;

            // const token=jwt.sign({id:user._id,username:user.username},JWT_TOKEN,{expiresIn: "30s"});
            const token = jwt.sign({ user }, JWT_TOKEN, { expiresIn: '1d' });

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

export default user_routes;

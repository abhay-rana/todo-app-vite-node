// passport.js

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { UserDb } from '../models/user-schema';

// Google OAuth 2.0 configuration
const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/auth/google/callback',
    passReqToCallback: true,
};

// GitHub OAuth configuration
const githubConfig = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/auth/github/callback',
    passReqToCallback: true,
};

// Common function to handle user details
async function handleUserDetails(profile) {
    try {
        // Check if user exists in database based on profile data (profile.id, profile.email, etc.)
        let user = await UserDb.findOne({ githubId: profile.id });

        if (!user) {
            // If user doesn't exist, create new user record in database
            user = await UserDb.create({
                socialId: profile.id,
                username: profile.username,
            });
        }

        // Retrieve user record from database
        user = await UserDb.findById(profile.id);

        return user;
    } catch (error) {
        console.log(error);
        throw error; // Handle error appropriately
    }
}

//! This functions of the passport will be triggered when these /auth/github/callback triggered

passport.use(
    new GoogleStrategy(googleConfig, async function (
        request,
        accessToken,
        refreshToken,
        profile,
        done
    ) {
        try {
            // Handle user details
            const user = await handleUserDetails(profile);

            // Pass user to done callback
            done(null, user);
        } catch (error) {
            done(error); // Pass error to done callback
        }
    })
);

// GitHub strategy
passport.use(
    new GitHubStrategy(githubConfig, async function (
        request,
        accessToken,
        refreshToken,
        profile,
        done
    ) {
        try {
            // Handle user details
            const user = await handleUserDetails(profile);

            // Pass user to done callback
            done(null, user);
        } catch (error) {
            done(error); // Pass error to done callback
        }
    })
);

passport.serializeUser((user, done) => {
    // Serialize user data
    done(null, user);
});

passport.deserializeUser((user, done) => {
    // Deserialize user data
    done(null, user);
});

export default passport;

// passport.js

const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const passportConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true,
};

passport.use(
    new GoogleStrategy(passportConfig, function (
        request,
        accessToken,
        refreshToken,
        profile,
        done
    ) {
        // Callback function to handle user profile data
        return done(null, profile);
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

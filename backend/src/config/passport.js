import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { UserDb } from '../models/user-schema.js';

const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/auth/google/callback',
};

const githubConfig = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/auth/github/callback',
};

// const facebookConfig = {
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: 'http://localhost:8000/auth/facebook/callback',
//     profileFields: ['id', 'emails', 'name'], // Request fields from Facebook
// };

async function findOrCreateUser(profile) {
    let user = await UserDb.findOne({ socialLoginId: profile.id });

    if (!user) {
        user = new UserDb({
            socialLoginId: profile.id,
            username: profile.displayName, // Changed to use profile.displayName
            email: profile.emails[0].value, // Changed to get the primary email
            method: profile.provider, // Storing the provider for distinguishing between Google and GitHub
        });
        await user.save();
    }

    return user;
}

passport.use(
    new GoogleStrategy(
        googleConfig,
        async (request, accessToken, refreshToken, profile, done) => {
            try {
                const user = await findOrCreateUser(profile);
                done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    new GitHubStrategy(
        githubConfig,
        async (request, accessToken, refreshToken, profile, done) => {
            try {
                const user = await findOrCreateUser(profile);
                done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

// passport.use(
//     new FacebookStrategy(
//         facebookConfig,
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 // profile.id will be the unique identifier for the user
//                 const user = await findOrCreateUser({
//                     id: profile.id,
//                     displayName: profile.displayName,
//                     emails: profile.emails,
//                     provider: 'facebook',
//                 });
//                 done(null, user);
//             } catch (error) {
//                 done(error);
//             }
//         }
//     )
// );
passport.serializeUser((user, done) => {
    done(null, user._id); // Serialize user by ID
});

passport.deserializeUser((id, done) => {
    UserDb.findById(id, (err, user) => done(err, user)); // Deserialize user from ID
});

export default passport;

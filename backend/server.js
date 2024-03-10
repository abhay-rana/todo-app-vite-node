import express from 'express';
import session from 'express-session';

import cors from 'cors';
import 'dotenv/config';
import { PORT } from './env.js';
import { connectDb } from './src/config/db.js';

import user_routes from './src/routes/user-routes.js';
import { Authorize } from './src/middlewares/authorize-middleware.js';
import todo_routes from './src/routes/todo-routes.js';
import test_routes from './src/routes/test-routes.js';
import passport from './src/config/passport.js';

const app = express();

//* connection with the database
connectDb();

//!! middlewares

// Use express-session middleware
app.use(
    session({
        secret: 'your_session_secret',
        resave: false,
        saveUninitialized: false,
    })
);

app.use(
    cors({
        origin: 'http://localhost:3000',
    })
); //only this domain can only make requests white listings the ip-addresses

//! for parse all the data in the body request
app.use(express.json());
app.use(passport.initialize());

//! routes
app.use('/', user_routes);
app.use('/', todo_routes);
app.use('/', test_routes);

app.get('/', (req, res) => {
    res.send(`<h1>hello there</h1>`);
});

app.get('/protected', Authorize, (req, res) => {
    res.send('Protected routes');
});

app.listen(PORT, () => {
    console.log(`listen at port ${PORT}`);
});

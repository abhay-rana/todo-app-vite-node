import express from 'express';
import session from 'express-session';
import multer from 'multer';

import { fileURLToPath } from 'url';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

import { dirname, join } from 'path';

import cors from 'cors';
import 'dotenv/config';
import { PORT } from './env.js';
import { connectDb } from './src/config/db.js';

import user_routes from './src/routes/user-routes.js';
import { Authorize } from './src/middlewares/authorize-middleware.js';
import todo_routes from './src/routes/todo-routes.js';
import test_routes from './src/routes/test-routes.js';
import passport from './src/config/passport.js';
import Upload from './src/middlewares/upload-middleware.js';
import uploadToCloudinary from './src/utils/cloudinary.js';

// Centralized configuration
const SESSION_SECRET = 'your_session_secret';
const CORS_ORIGIN = 'http://localhost:3000';
const UPLOADS_DIRECTORY = join(
    dirname(fileURLToPath(import.meta.url)),
    'public',
    'uploads'
);

const app = express();

//* connection with the database
connectDb();

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(UPLOADS_DIRECTORY)) {
    fs.mkdirSync(UPLOADS_DIRECTORY, { recursive: true });
}
// Middlewares
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/uploads', express.static(UPLOADS_DIRECTORY));

// Routes
app.use('/', user_routes);
app.use('/', todo_routes);
app.use('/', test_routes);

//
app.post('/upload', Upload, (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    // Call the uploadToCloudinary function to upload file to Cloudinary
    uploadToCloudinary(req.file.path, (error, imageUrl) => {
        if (error) {
            return res.status(500).send('Error uploading image to Cloudinary');
        }

        // Send back the URL of the uploaded image on Cloudinary
        res.send(imageUrl);
    });
});

app.get('/', (req, res) => {
    res.send(`<h1>hello there ${123}</h1>`);
});

app.get('/protected', Authorize, (req, res) => {
    res.send('Protected routes');
});

app.listen(PORT, () => {
    console.log(`listen at port ${PORT}`);
});

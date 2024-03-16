// multerConfig.js

import multer from 'multer';

// Configure Multer to upload to local disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads'); // Save uploaded files to the 'public/uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Generate unique file names
    },
});

const Upload = multer({ storage: storage }).single('file');

export default Upload;

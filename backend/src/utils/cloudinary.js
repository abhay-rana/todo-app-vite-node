import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: 'dyo0z6uvw',
    api_key: '158375558112431',
    api_secret: 'N_XQzlPD_wVkthA78k4uIUPkiuM',
});

// Function to upload file to Cloudinary
const uploadToCloudinary = (filePath, callback) => {
    cloudinary.uploader.upload(filePath, (error, result) => {
        if (error) {
            return callback(error, null);
        }

        // Delete the uploaded file from local disk storage
        // (assuming you have fs imported)
        fs.unlinkSync(filePath);

        // Return the URL of the uploaded image on Cloudinary
        callback(null, result.secure_url);
    });
};

export default uploadToCloudinary;

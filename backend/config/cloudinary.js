// cloudinaryConfig.js
import cloudinary from 'cloudinary';
//import { CloudinaryStorage } from 'multer-storage-cloudinary';
import "dotenv/config"

cloudinary.v2.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
});

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary.v2,
//     params: {
//         folder: 'food-images',
//         allowedFormats: ['jpeg', 'png', 'jpg'],
//     },
// });

export { cloudinary };

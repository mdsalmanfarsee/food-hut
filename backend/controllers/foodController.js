// import foodModel from '../models/foodModels.js';
// import { cloudinary } from '../config/cloudinary.js';

// // Add food item
// const addFood = async (req, res) => {
//     let image_url = req.file.path; // Cloudinary URL is in `req.file.path`

//     const food = new foodModel({
//         name: req.body.name,
//         description: req.body.description,
//         price: req.body.price,
//         category: req.body.category,
//         image: image_url,
//     });

//     try {
//         await food.save();
//         res.json({ success: true, msg: 'Food added' });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, msg: 'Failed to save food item' });
//     }
// };

// // All food list
// const listFood = async (req, res) => {
//     try {
//         const foods = await foodModel.find({});
//         res.json({ success: true, data: foods });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, msg: 'Error fetching data' });
//     }
// };

// // Remove food item
// const removeFood = async (req, res) => {
//     try {
//         const food = await foodModel.findById(req.body.id);
//         if (food) {
//             // Delete image from Cloudinary
//             const publicId = food.image.split('/').pop().split('.')[0]; // Extract public ID
//             //console.log(`Deleting image with publicId: ${publicId}`);
//             await cloudinary.v2.uploader.destroy(`food-images/${publicId}`);

//             // Delete food item from database
//             await foodModel.findByIdAndDelete(req.body.id);
//             res.json({ success: true, msg: 'Food removed' });
//         } else {
//             res.json({ success: false, msg: 'Food item not found' });
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, msg: 'Failed to remove food item' });
//     }
// };

// export { addFood, listFood, removeFood };














// foodController.js
import foodModel from '../models/foodModels.js';
import { cloudinary } from '../config/cloudinary.js';
import fs from 'fs';  // For file system operations

// Add food item
const addFood = async (req, res) => {
    if (!req.file) {
        return res.json({ success: false, msg: 'No image provided' });
    }

    // Path of the file on the local disk
    const localFilePath = req.file.path;

    try {
        // Upload image to Cloudinary
        const result = await cloudinary.v2.uploader.upload(localFilePath, {
            folder: 'food-images'
        });

        // Remove the local file after uploading
        fs.unlinkSync(localFilePath);

        // Create a new food item in the database
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: result.secure_url,  // Cloudinary URL
        });

        await food.save();
        res.json({ success: true, msg: 'Food added' });
    } catch (error) {
        console.log(error);
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);  // Remove local file if there was an error
        }
        res.json({ success: false, msg: 'Failed to save food item' });
    }
};

// All food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: 'Error fetching data' });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (food) {
            // Delete image from Cloudinary
            const publicId = food.image.split('/').pop().split('.')[0]; // Extract public ID
            await cloudinary.v2.uploader.destroy(`food-images/${publicId}`);

            // Delete food item from database
            await foodModel.findByIdAndDelete(req.body.id);
            res.json({ success: true, msg: 'Food removed' });
        } else {
            res.json({ success: false, msg: 'Food item not found' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: 'Failed to remove food item' });
    }
};

export { addFood, listFood, removeFood };


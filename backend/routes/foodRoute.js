// import express from "express";
// import { addFood, listFood, removeFood } from "../controllers/foodController.js";
// import multer from "multer";
// import { storage } from '../config/cloudinary.js';


// const foodRouter = express.Router();


// const upload = multer({ storage });


// foodRouter.post('/add', upload.single('image'), addFood);
// foodRouter.get('/list', listFood);
// foodRouter.post('/remove', removeFood);

// export default foodRouter;















// foodRoutes.js
import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
import path from "path";

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/tmp');  // vercel directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Add a unique suffix to the file name
    }
});

const upload = multer({ storage });

const foodRouter = express.Router();

foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get('/list', listFood);
foodRouter.post('/remove', removeFood);

export default foodRouter;

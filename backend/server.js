import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import 'dotenv/config'

//add config
const app = express();

const PORT = process.env.PORT || 4000
//add middlewire
app.use(express.json())
app.use(cors(
    {
        origin: ["https://food-hut-admin.vercel.app", "https://food-app-frontend-tau.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
/*
{
    origin:["https://food-app-frontend-tau.vercel.app"],
    methods:["POST","GET"],
    credentials:true
}
*/

//connect database
connectDB();

//api endpoint
app.use('/api/food', foodRouter)
//app.use('/images', express.static('uploads'))
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send("API working")
})

app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`);

})

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception thrown:', error);
});

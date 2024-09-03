import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"




//placing order from frontend
const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173"

    try {

        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })

        return res.json({ success: true, msg: "order placed" })

    } catch (error) {
        console.log(error);
        return res.json({ success: false, msg: "Error" })

    }
}

//user order for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        return res.json({ success: true, data: orders })
    } catch (error) {
        return res.json({ success: false, msg: "error" })
    }
}

//listing all orders in admin panel

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        return res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);

        return res.json({ success: false, msg: "Error fetching data" })
    }

}

//updating status of the order
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        return res.json({ success: true, msg: "status updated" })
    } catch (error) {
        return res.json({ success: false, msg: "failed updating status" })
    }
}


export { placeOrder, userOrders, listOrders, updateStatus }

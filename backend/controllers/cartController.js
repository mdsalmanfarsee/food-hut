import userModel from '../models/userModel.js'

//add to cart
const addToCart = async (req, res) => {
    try {

        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;

        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        return res.json({ success: true, msg: "Added to cart" })
    } catch (error) {
        console.log(error);
        return res.json({ success: false, msg: "Something went wrong" })

    }
}

//remove from cart
const removeCart = async (req, res) => {

    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 0;
        }
        else {
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        return res.json({ success: true, msg: "Removed from cart" })

    } catch (error) {
        console.log(error);
        return res.json({ success: false, msg: "Error" });

    }
}


//get cart items
const getCart = async (req, res) => {

    try {
        const userData = await userModel.findById(req.body.userId);
        const cartData = userData.cartData;
        return res.json({ success: true, cartData })
    } catch (error) {
        return res.json({ success: false, msg: "Error" })
    }

}

export { addToCart, removeCart, getCart }
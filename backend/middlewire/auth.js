import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, msg: "Not authorized, login first" })
    }


    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET); //we get the user id
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        return res.json({ success: false, msg: "error" });

    }
}


export default authMiddleware;
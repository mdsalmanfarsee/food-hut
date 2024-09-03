import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from 'validator'

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        //check email is valid or not
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, msg: "No user is found!" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, msg: "Incorrect Password!" })
        }

        const token = createToken(user._id);
        return res.json({ success: true, token, msg: "login success!" })

    } catch (error) {
        return res.json({ success: false, msg: "Some error occured, try again" })
    }


}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

//register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {

        //check if already exists
        const exist = await userModel.findOne({ email })
        if (exist) {
            return res.json({ success: false, msg: "User already exists" })
        }
        //check for validity of email address
        if (!validator.isEmail(email)) {
            return res.json({ success: false, msg: "Please enter valid email" })
        }

        //check if password length is less than 8
        if (password.length < 8) {
            return res.json({ success: false, msg: "Password must contain 8 or more characters" })
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hassedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hassedPassword,
        })
        //create user
        const user = await newUser.save();
        const token = createToken(user._id);


        return res.json({ success: true, token, msg: "Successfully registered, please login" })

    } catch (error) {
        return res.json({ success: false, msg: "Some error occurs, try again" })
    }



}

export { loginUser, registerUser }
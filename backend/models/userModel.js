import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartData: {
        type: Object,
        default: {}
    },
}, { minimize: false }) //here minimize:false used for create cartData field in the database even if cartData is empty



const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
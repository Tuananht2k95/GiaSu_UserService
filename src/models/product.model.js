import mongoose, {Schema} from "mongoose";
const addressSchema = new mongoose.Schema({
    ward: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
})

const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: Number,
        required: true,
    },
    dateOfBirth: String,
    subject: {
        type: String,
        enum: ['Toán', 'Vật Lý', 'Hoá học', 'Sinh học', 'Ngữ Văn', 'Tiếng Anh', 'Các môn khác'],
        default: 'Các môn khác'
    },
    levelStudent: {
        type: Number,
        //1 - cap 1, 2 - cap 2, 3 - cap 3, 4 - đại học trở lên
        required: true,
    },
    levelTeacher: {
        type: Number,
        //1 - tutor, 2 - teacher
        required: true,

    },
    address: {
        type: addressSchema,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'blocked'],
        default: 'active'
    },
});

export const Product = mongoose.model('Product', productSchema, 'products');

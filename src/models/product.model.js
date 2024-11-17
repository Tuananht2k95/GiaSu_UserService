import mongoose from "mongoose";
import { PRODUCT } from "../config/constant.js";
    
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
        type: Number,
        required: true,        
    },
    levelStudent: {
        type: Number,
        required: true,
        enum: {
            values: Object.values(PRODUCT.levelStudent)
        }
    },
    levelTeacher: {
        type: Number,
        required: true,
        enum: {
            values: Object.values(PRODUCT.levelTeacher)
        }
    },
    ward: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: {
            values: Object.values(PRODUCT.status)
        },
        default: PRODUCT.status.inactive
    },
});

export const Product = mongoose.model('Product', productSchema, 'products');

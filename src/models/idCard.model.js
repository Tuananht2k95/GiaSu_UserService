import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { USER } from "../config/constant.js";

const idCardSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            required: true,
        },
        idNumber: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        frontCard: {
            type: String,
            required: true,
        },
        backCard: {
            type: String,
            required: true,
        },
        idCardStatus: {
            type: Number,
            required: true,
            enum: {
                values: Object.values(USER.idCardStatus)
            }, 
            default: USER.idCardStatus.inactive,
        },
        note: {
            type: String,
            default: ''
        }
    }
);

export const IdCard = new mongoose.model('IdCard', idCardSchema, 'idCard')
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { IDCARD, USER } from "../config/constant.js";
import { getUrl } from "../helpers/helpers.js";

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
            get: function(img) {
                return getUrl(img, 'user/idCard');
            },
        },
        backCard: {
            type: String,
            required: true,
            get: function(img) {
                return getUrl(img, 'user/idCard');
            },
        },
        idCardStatus: {
            type: Number,
            enum: {
                values: Object.values(IDCARD.idCardStatus)
            }, 
            default: IDCARD.idCardStatus.unconfirm,
        },
        note: {
            type: String,
            default: '',
        }
    },
    {
        toJSON: {getters: true},
    }
);

export const IdCard = new mongoose.model('IdCard', idCardSchema, 'idCard')
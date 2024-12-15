import mongoose, { get } from "mongoose";
import { USER } from "../config/constant.js";
import { getUrlAvatar } from "../helpers/helpers.js";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            get: getUrlAvatar,
        },
        gender: {
            type: Number,
            required: true,
        },
        dateOfBirth: {
            type: String,
        },
        role: {
            type: Number,
            required: true,
            enum: {
                values: Object.values(USER.role)
            },
            default: USER.role.teacher
        },
        levelTeacher: {
            type: Number,
            enum: {
                values: Object.values(USER.levelTeacher)
            },
            default: USER.levelTeacher.tutor,
            required: true,
        },
        currentWorkplace: {
            type: String,
        },
        previousWorkplace: {
            type: String,
        },
        status: {
            type: Number,
            required: true,
            enum: {
                values: Object.values(USER.status)
            },
            default: USER.status.inactive,
        },
    },
    {
        toJSON: {getters: true},
    }
);

export const User = mongoose.model('User', userSchema, 'users');

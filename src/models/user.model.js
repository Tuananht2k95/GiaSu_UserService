import mongoose, { get, set } from "mongoose";
import { USER } from "../config/constant.js";
import { getUrl } from "../helpers/helpers.js";

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
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: 'test.jpg',
            get: function(img) {
                return getUrl(img, 'user/avatar')
            },
        },
        gender: {
            type: Number,
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
        createdAt: {
            type: Date,
            required: false,
            timestamps: true,
        },
        updatedAt: {
            type: Date,
            required: false,
            timestamps: true,
        },
        createBy: {
            type: String,
            required: false,
        },
        updateBy: {
            type: String, 
            required: false,
        }
        
    },
    {
        toJSON: {getters: true},
        timestamps: true,
    }
);

export const User = mongoose.model('User', userSchema, 'users');

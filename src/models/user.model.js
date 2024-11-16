import mongoose, { Schema } from "mongoose";

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
        avatar: String,
        gender: {
            type: Number,
            required: true,
        },
        dateOfBirth: String,
        role: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'blocked'],
            default: 'active'
        },
    }
);

export const User = mongoose.model('User', userSchema, 'users');

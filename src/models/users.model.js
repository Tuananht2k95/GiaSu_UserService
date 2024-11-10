import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
    {
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
            required: true
        },
        dateOfBirth: String,
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'blocked'],
            default: 'active'
        },
    }
);

export const User = mongoose.model('User' , userSchema, 'users');

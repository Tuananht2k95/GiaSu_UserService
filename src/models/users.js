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
            type: String,
            enum: ['male', 'female', 'other']
        },
        dateOfBirth: Date,
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

const User = mongoose.model('User' , userSchema);
export {User};

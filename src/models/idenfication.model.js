import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const idenficationSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            required: true,
        },
        idNumber: {
            type: string,
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
    }
);

export const Idenfication = new mongoose.model('Idenfication', idenficationSchema, 'idenfication')
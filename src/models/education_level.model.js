import {Schema} from "mongoose";
import { ObjectId } from "mongodb";

const educationLevelSchema = new Schema(
    {
        userId: {
            type: ObjectId,
            required: true,
        },
        university: {
            type: String,
            required: true,
        },
        startYear: {
            type: Number,
            required: true,
            max: 3000,
            min: 1900,
        },
        endYear: {
            type: Number,
            required: true,
            max: 3000,
            min: 1900,
        },
        authenticationImage: {
            type: String,
        }
    }
)
export const EducationLevel = mongoose.model('EducationLevel', educationLevelSchema, 'education_levels')
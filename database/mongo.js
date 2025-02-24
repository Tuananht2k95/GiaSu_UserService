
import mongoose from "mongoose";

export const connectMongoDB = mongoose.connect(process.env.MONGODB, {
  autoIndex: true,
})

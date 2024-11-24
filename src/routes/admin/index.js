import express from "express";
import userRouter from "./user.router.js";
import productRouter from "./product.router.js";

const adminRouter = express.Router()

adminRouter.use('/user', userRouter);
adminRouter.use('/product', productRouter);

export default adminRouter;

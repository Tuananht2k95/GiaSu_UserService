import express from "express";
import userRouter from "./teacher/users.route.js";
import productRouter from "./teacher/products.js";

const router = express.Router();
router.use('/product', productRouter)
router.use('/users', userRouter);

export default router 
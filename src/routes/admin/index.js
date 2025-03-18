import express from "express";
import userRouter from "./user.router.js";
import { adminOnlyMiddeware } from "../../middleware/adminOnly.js";

const adminRouter = express.Router()

adminRouter.use('/user', userRouter);

export default adminRouter;

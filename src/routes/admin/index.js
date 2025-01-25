import express from "express";
import userRouter from "./user.router.js";
import { adminOnlyMiddeware } from "../../middleware/adminOnly.js";
import profileRouter from "./profile.router.js";

const adminRouter = express.Router()

adminRouter.use('/user', userRouter);
adminRouter.use('/profile', profileRouter);

export default adminRouter;

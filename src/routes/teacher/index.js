import express from "express";
import userRouter from "./user.router.js";
import profileRouter from "./profile.router.js";

const teacherRouter = express.Router();

teacherRouter.use('/user', userRouter);
teacherRouter.use('/profile', profileRouter);

export default teacherRouter;


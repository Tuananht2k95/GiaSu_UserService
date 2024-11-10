import express from "express";
import userRouter from "./teacher/user.route.js";
import adminRouter from "./admin/index.js";

const router = express.Router();
router.use('/user', userRouter);
router.use('/admin', adminRouter);

export default router;
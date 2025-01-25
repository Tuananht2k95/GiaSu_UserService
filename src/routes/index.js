import express from "express";
import adminRouter from "./admin/index.js";
import authRouter from "./auth/auth.router.js";
import teacherRouter from "./teacher/index.js";

const router = express.Router();
router.use('/auth', authRouter);
router.use('/teacher', teacherRouter);
router.use('/admin', adminRouter);

export default router;
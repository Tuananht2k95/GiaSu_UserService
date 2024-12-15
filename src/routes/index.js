import express from "express";
import adminRouter from "./admin/index.js";
import loginRouter from "./auth/login.router.js";
import teacherRouter from "./teacher/index.js";


const router = express.Router();
router.use('/user', teacherRouter);
router.use('/admin', adminRouter);
router.use('/login', loginRouter);


export default router;
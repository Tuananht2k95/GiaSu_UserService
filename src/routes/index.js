import express from "express";
import adminRouter from "./admin/index.js";
import authRouter from "./auth/auth.router.js";
// import teacherRouter from "./teacher/index.js";
import profileRouter from "./profile/profile.router.js";

const router = express.Router();
router.get('', (req, res) => {
    res.json('1')
})
router.use('/auth', authRouter);
// router.use('/teacher', teacherRouter);
router.use('/admin', adminRouter);
router.use('/profile', profileRouter);

export default router;
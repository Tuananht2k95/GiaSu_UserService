import express from "express"
import AuthController from "../../controllers/admin/auth.controller.js";

const authRouter = express.Router();
const authController = new AuthController()

authRouter.post('/login', authController.login);
authRouter.put('/confirmAccount', authController.confirmAccount)
export default authRouter;
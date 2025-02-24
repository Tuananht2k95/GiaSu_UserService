import express from "express"
import AuthController from "../../controllers/auth/auth.controller.js";

const authRouter = express.Router();
const authController = new AuthController()

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.put('/confirmAccount', authController.confirmAccount)
export default authRouter;
import express from "express"
import AuthController from "../../controllers/auth/auth.controller.js";
import { validateLoginUser, validateStoreUser } from "../../validations/user/user.validation.js";

const authRouter = express.Router();
const authController = new AuthController()

authRouter.post('/login', validateLoginUser, authController.login);
authRouter.post('/register', validateStoreUser, authController.register);
authRouter.put('/confirmAccount', authController.confirmAccount)
export default authRouter;
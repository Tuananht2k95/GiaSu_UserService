import express from "express"
import AuthController from "../../controllers/admin/auth.controller.js";

const authRouter = express.Router();
const authController = new AuthController()

authRouter.use('/', authController.login);

export default authRouter;
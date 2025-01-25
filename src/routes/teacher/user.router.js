import express from 'express';
import UserController from '../../controllers/teacher/user.controller.js';


const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/', userController.store);

export default userRouter;
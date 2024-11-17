import express from 'express';
import UserController from '../../controllers/teacher/user.controller.js';
import { validateStoreUser, validateUpdateUser } from '../../validations/teacher/user.validation.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/', validateStoreUser, userController.store);
userRouter.get('/search', userController.search);
userRouter.put('/:userId', validateUpdateUser, userController.update);
userRouter.get('/:userId', userController.find);

export default userRouter;
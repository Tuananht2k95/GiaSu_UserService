import express from 'express';
import UserController from '../../controllers/admin/user.controller.js';
import { validateIndexUser, validateStoreUser, validateUpdateUser } from '../../validations/teacher/user.validation.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.get('/', validateIndexUser,  userController.index)
userRouter.post('/', validateStoreUser, userController.store);
userRouter.put('/:userId', validateUpdateUser, userController.update);
userRouter.get('/:userId', userController.show);
userRouter.delete('/:userId', userController.delete);
userRouter.post('/confirm-account', userController.confirmAccount)
export default userRouter;
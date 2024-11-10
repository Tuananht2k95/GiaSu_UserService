import express from 'express';
import UserController from '../../controllers/admin/user.controller.js';
import { validateStoreUser, validateUpdateUser } from '../../validations/teacher/user.validation.js';
const userRouter = express.Router();
const userController = new UserController();

userRouter.get('/', (req,res) => {return res.json('admin/user test')});
userRouter.post('/', validateStoreUser, userController.store);
userRouter.put('/:userId', validateUpdateUser, userController.update);
userRouter.get('/:userId', userController.find);
userRouter.delete('/:userId', userController.delete);
export default userRouter;
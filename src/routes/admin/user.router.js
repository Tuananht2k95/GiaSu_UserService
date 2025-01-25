import express from 'express';
import UserController from '../../controllers/admin/user.controller.js';
import { validateStoreUser, validateIndexUser, validateUpdateUser, validateUserId } from '../../validations/user/user.validation.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/', validateStoreUser, userController.store);

userRouter.use(authMiddleware);
userRouter.get('/', validateIndexUser, userController.index)
userRouter.put('/:userId', validateUpdateUser ,userController.update);
userRouter.get('/:userId', validateUserId, userController.show);
userRouter.delete('/:userId', validateUserId, userController.delete);

export default userRouter;
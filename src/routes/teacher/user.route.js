import express from 'express';
import UserController from '../../controllers/teacher/user.controller.js';
import { validateStoreUser, validateUpdateUser } from '../../validations/teacher/user.validation.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/', validateStoreUser, userController.store);
userRouter.put('/:userId', validateUpdateUser, userController.update);
userRouter.get('/:userId', userController.find);
userRouter.get('/', userController.index)

userRouter.get(
    '/addresses',
    (req, res) => {
        res.send('dia chi')
    }
);

userRouter.post(
    '/verify',
    (req, res) => {
        res.send('xac thuc')
    }
);

export default userRouter;
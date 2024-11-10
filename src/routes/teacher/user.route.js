import express from 'express';
import UserController from '../../controllers/teacher/user.controller.js';
import { validateStoreUser, validateUpdateUser } from '../../validations/teacher/user.validation.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.get(
    '/',
    (req, res) => {
        res.send('Trang chu user')
    }
);

userRouter.post('/', validateStoreUser, userController.store);
userRouter.put('/:userId', validateUpdateUser, userController.update);
userRouter.get('/:userId', userController.find);

userRouter.post(
    '/password/reset',
    (req, res) => {
        res.send('reset pass')
    }
);

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
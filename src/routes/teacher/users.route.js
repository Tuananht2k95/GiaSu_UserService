import express from 'express';
import UserController from '../../controllers/teacher/user.controller.js';
import { validateStoreUser } from '../../validations/teacher/users.validation.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.get(
    '/',
    (req, res) => {
        res.send('Trang chu user')
    }
);

userRouter.post('/', validateStoreUser, userController.store);

userRouter.post(
    '/login',
    (req, res) => {
        res.send('dang nhap')
    }
);

userRouter.get(
    '/profile',
    (req, res) => {
        res.send('profile')
    }
);

userRouter.put(
    '/profile',
    (req, res) => {
        res.send('update profile')
    }
);

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
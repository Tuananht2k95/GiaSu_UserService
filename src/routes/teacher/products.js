import express from 'express';

const productRouter = express.Router();
productRouter.use((req, res, next) => {
    console.log('authen');
    next();
});
productRouter.get(
    '/',
    (req, res) => {
        res.send('Trang chu product')
    }
);

productRouter.post(
    '/',
    (req, res) => {
        res.send('dang ky')
    }
);

productRouter.post(
    '/login',
    (req, res) => {
        res.send('dang nhap')
    }
);

productRouter.get(
    '/profile',
    (req, res) => {
        res.send('profile')
    }
);

productRouter.put(
    '/profile',
    (req, res) => {
        res.send('update profile')
    }
);

productRouter.post(
    '/password/reset',
    (req, res) => {
        res.send('reset pass')
    }
);

productRouter.get(
    '/addresses',
    (req, res) => {
        res.send('dia chi')
    }
);

productRouter.post(
    '/verify',
    (req, res) => {
        res.send('xac thuc')
    }
);

export default productRouter;
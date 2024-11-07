import express from "express";

const router = express.Router();

router.get(
    '/',
    (req, res) => {
        res.send('Trang chu router')
    }
)

export default router 
import express from 'express';
import ProductController from '../../controllers/admin/product.controller.js';

const productRouter = express.Router();
const productController = new ProductController();

productRouter.get('/', (req,res) => {res.json(hello)})

export default productRouter;
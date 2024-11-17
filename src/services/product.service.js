import { Product } from "../models/product.model.js";
import { isValidObjectId } from "mongoose";

class ProductService {
    async store(data) {
        const newProduct = await Product.create(data);
        return newProduct;
    }

    async update(productId, data) {
        if (!isValidObjectId(productId)) {
            return 'Product khong ton tai';
        }

        const product = await Product.findById(productId);

        if (product == null) {
            return 'Product khong ton tai';
        };
        const productUpdated = await Product.findByIdAndUpdate(productId, data);
        return productUpdated;
    };

    async find(productId) {
        if (!isValidObjectId(productId)) {
            return 'Product khong ton tai';
        }

        const product = await Product.findById(productId);Product
        if (product == null) {
            return 'Product khong ton tai';
        };
        return product;
    };

    async delete(productId) {
        if (!isValidObjectId(productId)) {
            return 'Product khong ton tai';
        }

        const product = await Product.findById(productId);

        if (product == null) {
            return 'Product khong ton tai';
        };
        return await Product.findByIdAndDelete(productId);
    };
}

export default ProductService;
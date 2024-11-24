import ProductService from '../../services/product.service.js'

class ProductController {
    async store(req, res) {
        try {
            const productService = new ProductService();
            return res.json(await productService.store(req));
        } catch (error) {
            res.json(error.message)
        }
    };

    async update(req, res) {
        try {
            const productService = new ProductService();
            return res.json(await productService.update(req.params.productId, req.body));
        } catch (error) {
            res.json(error.message)
        }
    };

    async find(req, res) {
        try {
            const productService = new ProductService();

        } catch (error) {
            res.json(error.message)

        }
    }
}

export default ProductController;
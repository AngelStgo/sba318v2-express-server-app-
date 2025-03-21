import express from 'express';
import products from '../data/products.js';

const productRouter = express.Router();

// GET: Retrieve all products
productRouter.get('/', (req, res) => {
    let filteredProducts = products;

    if (req.query.category) {
        filteredProducts = products.filter(p => p.category.toLowerCase() === req.query.category.toLowerCase());
    }

    res.json(filteredProducts);
});

// PATCH: Update product by ID
productRouter.patch('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ error: 'Product not found' });

    product.name = req.body.name || product.name;
    product.price = req.body.price !== undefined ? req.body.price : product.price;
    product.category = req.body.category || product.category;

    res.json({ message: 'Product updated successfully', product });
});

export default productRouter;

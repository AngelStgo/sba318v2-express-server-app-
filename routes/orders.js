import express from 'express';
import orders from '../data/orders.js';

const orderRouter = express.Router();

// GET: Retrieve all orders
orderRouter.get('/', (req, res) => {
    let filteredOrders = orders;

    if (req.query.status) {
        filteredOrders = orders.filter(o => o.status.toLowerCase() === req.query.status.toLowerCase());
    }

    res.json(filteredOrders);
});

// DELETE: Remove order by ID
orderRouter.delete('/:id', (req, res) => {
    const index = orders.findIndex(o => o.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Order not found' });

    orders.splice(index, 1);
    res.json({ message: 'Order deleted successfully' });
});

export default orderRouter;


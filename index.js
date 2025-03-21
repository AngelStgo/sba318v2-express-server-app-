import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Middleware Imports
import logger from './middleware/logger.js';
import customHeader from './middleware/customHeader.js';
import errorHandler from './middleware/errorHandler.js';

// Import Routes
import userRouter from './routes/users.js';
import productRouter from './routes/products.js';
import orderRouter from './routes/orders.js';

const app = express();
const PORT = 5050;

// Convert file paths to ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware 
app.use(bodyParser.json());
app.use(cors());
app.use(logger);
app.use(customHeader);
// Error Handling Middleware
app.use(errorHandler);

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

// Home Route 
app.get('/', (req, res) => {
    res.render('index', { title: 'API Overview' });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

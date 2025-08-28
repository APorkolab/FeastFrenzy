const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const logger = require('./logger/logger');
const httpErrors = require('http-errors');
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('combined', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Routes
app.use('/employees', require('./controller/employee/router'));
app.use('/products', require('./controller/product/router'));
app.use('/purchases', require('./controller/purchase/router'));
app.use('/purchase-items', require('./controller/purchase-item/router'));

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// 404 Handler
app.use((req, res, next) => {
    next(httpErrors(404, 'Not found'));
});

// Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
        },
    });
});

module.exports = app;
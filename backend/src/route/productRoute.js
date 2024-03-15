const { Hono } = require('hono');
const { createNewProduct } = require('../controller/productController');

const productRoute = new Hono();

productRoute.post('/createNewProduct', ...createNewProduct);

module.exports = { productRoute };

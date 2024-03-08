const { Hono } = require('hono');
const { createNewProduct } = require('../controller/productController');

const productRoute = new Hono();

productRoute.post('/createNewService', ...createNewProduct);

module.exports = { productRoute };

const { Hono } = require('hono');
const { createNewProduct, getProductById, getProductsByCustomerId } = require('../controller/productController');

const productRoute = new Hono();

productRoute.post('/createNewProduct', ...createNewProduct);
productRoute.get('/getProductById/:productId', ...getProductById);
productRoute.get('/getProductsByCustomerId/:customerId', ...getProductsByCustomerId);

module.exports = { productRoute };

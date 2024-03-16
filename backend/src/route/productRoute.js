const { Hono } = require('hono');
const { createNewProduct, getProductById } = require('../controller/productController');

const productRoute = new Hono();

productRoute.post('/createNewProduct', ...createNewProduct);
productRoute.get('/getProductById/:productId', ...getProductById);

module.exports = { productRoute };

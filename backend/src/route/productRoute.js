const { Hono } = require('hono');
const {
    createNewProduct,
    getProductById,
    getProductsByCustomerId,
    getProductsByCustomerMobileNum,
} = require('../controller/productController');

const productRoute = new Hono();

productRoute.post('/createNewProduct', ...createNewProduct);
productRoute.get('/getProductById/:productId', ...getProductById);
productRoute.get('/getProductsByCustomerId/:customerId', ...getProductsByCustomerId);
productRoute.get('/getProductsByCustomerMobileNum', ...getProductsByCustomerMobileNum);

module.exports = { productRoute };

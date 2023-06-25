const { Hono } = require('hono');
const {
    createNewCustomer,
    updateCustomer,
    getCustomerByName,
    getCustomerById,
} = require('../controller/customerController');

const customerRoute = new Hono();

customerRoute.post('/createNewCustomer', ...createNewCustomer);
customerRoute.put('/updateCustomer/:customerId', ...updateCustomer);
customerRoute.get('/getCustomerByName', ...getCustomerByName);
customerRoute.get('/getCustomerById/:customerId', ...getCustomerById);

module.exports = { customerRoute };

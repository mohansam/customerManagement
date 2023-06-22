const { Hono } = require('hono');
const { createNewCustomer, updateCustomer, getCustomerByName } = require('../controller/customerController');

const customerRoute = new Hono();

customerRoute.post('/createNewCustomer', ...createNewCustomer);
customerRoute.put('/updateCustomer/:customerId', ...updateCustomer);
customerRoute.get('/getCustomerByName', ...getCustomerByName);

module.exports = { customerRoute };

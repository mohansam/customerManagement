const { Hono } = require('hono');
const { createNewCustomer, updateCustomer } = require('../controller/customerController');

const customerRoute = new Hono();

customerRoute.post('/createNewCustomer', ...createNewCustomer);
customerRoute.put('/updateCustomer/:customerId', ...updateCustomer);

module.exports = { customerRoute };

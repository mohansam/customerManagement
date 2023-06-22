const { Hono } = require('hono');
const { createNewCustomer } = require('../controller/customerController');
const { validateInput } = require('../middleware/validateInput');
const { createNewCustomerSchema } = require('../schema/createNewCustomerSchema');

const customerRoute = new Hono();

customerRoute.post('/createNewCustomer', validateInput(createNewCustomerSchema), createNewCustomer);

module.exports = { customerRoute };

const { Hono } = require('hono');
const { createNewCustomer } = require('../controller/customerController');

const customerRoute = new Hono();

customerRoute.get('/createNewCustomer', createNewCustomer);

module.exports = { customerRoute };

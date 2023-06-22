// eslint-disable-next-line import/no-unresolved
const { HTTPException } = require('hono/http-exception');
const { Customer } = require('../model/customerModel');
const { validateInput } = require('../middleware/validateInput');
const { customerSchema, customerIdValidationSchema } = require('../schema/customerValidationSchema');

const createNewCustomer = async (context) => {
    try {
        const { customerName, customerAddress, customerMobileNum } = context.req.validatedData;
        const newCustomer = await Customer.create({ customerName, customerAddress, customerMobileNum });
        return context.json(newCustomer.toJSON(), 200);
    } catch (err) {
        console.log(err);
        throw new HTTPException(500, { message: 'Internal server error' });
    }
};

const updateCustomer = async (context) => {
    try {
        const { customerId, ...customerObj } = context.req.validatedData;
        const updatedCustomer = await Customer.update(customerObj, { where: { customerId } });
        if (updatedCustomer[0] === 0) throw new HTTPException(404, { message: 'Customer not found' });
        return context.json(customerObj, 200);
    } catch (err) {
        if (err.status === 404) throw err;
        console.log(err);
        throw new HTTPException(500, { message: 'Internal server error' });
    }
};

module.exports = {
    createNewCustomer: [validateInput(customerSchema, 'body'), createNewCustomer],
    updateCustomer: [
        validateInput(customerIdValidationSchema, 'params'),
        validateInput(customerSchema, 'body'),
        updateCustomer,
    ],
};

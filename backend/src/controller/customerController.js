const { Customer } = require('../model/customerModel');
const { validateInput } = require('../middleware/validateInput');
const {
    customerSchema,
    customerIdValidationSchema,
    customerNameSchema,
} = require('../schema/customerValidationSchema');

const createNewCustomer = async (context) => {
    try {
        const { customerName, customerAddress, customerMobileNum } = context.req.validatedData;
        const newCustomer = await Customer.create({ customerName, customerAddress, customerMobileNum });
        return context.json(newCustomer.toJSON(), 200);
    } catch (err) {
        console.log(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

const updateCustomer = async (context) => {
    try {
        const { customerId, ...customerObj } = context.req.validatedData;
        const [updatedCustomer] = await Customer.update(customerObj, { where: { customerId } });
        if (updatedCustomer === 0) return context.json({ message: 'Customer not found' }, 404);
        return context.json(customerObj, 200);
    } catch (err) {
        console.log(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

const getCustomerByName = async (context) => {
    try {
        const { customerName } = context.req.validatedData;
        const customers = await Customer.findAll({ where: { customerName } });
        const customerData = customers.map((customer) => customer.toJSON());
        return context.json(customerData, 200);
    } catch (err) {
        console.error(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

module.exports = {
    createNewCustomer: [validateInput(customerSchema, 'body'), createNewCustomer],
    updateCustomer: [
        validateInput(customerIdValidationSchema, 'params'),
        validateInput(customerSchema, 'body'),
        updateCustomer,
    ],
    getCustomerByName: [validateInput(customerNameSchema, 'query'), getCustomerByName],
};

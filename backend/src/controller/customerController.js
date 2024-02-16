const { Op } = require('sequelize');
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
        const existingCustomer = await Customer.findOne({ where: { customerMobileNum } });
        if (existingCustomer) return context.json({ message: 'Customer with given mobile number already exists' }, 400);
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
        const customers = await Customer.findAll({
            where: {
                customerName: {
                    [Op.like]: `%${customerName}%`,
                },
            },
        });
        const customerData = customers.map((customer) => customer.toJSON());
        return context.json(customerData, 200);
    } catch (err) {
        console.error(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

const getCustomerById = async (context) => {
    try {
        const { customerId } = context.req.validatedData;
        const customer = await Customer.findByPk(customerId);
        if (!customer) return context.json({ message: 'Customer not found' }, 404);
        return context.json(customer.toJSON(), 200);
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
    getCustomerById: [validateInput(customerIdValidationSchema, 'params'), getCustomerById],
};

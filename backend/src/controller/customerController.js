const { Op } = require('sequelize');
const { Customer } = require('../model/customerModel');
const { validateInput } = require('../middleware/validateInput');
const {
    customerSchema,
    customerIdValidationSchema,
    customerNameSchema,
    paginationSchema,
    customerMobileNumSchema,
} = require('../schema/customerValidationSchema');

const createNewCustomer = async (context) => {
    try {
        const { customerName, customerAddress, customerMobileNum } = context.req.validatedData;
        const existingCustomer = await Customer.findOne({ where: { customerMobileNum } });
        if (existingCustomer) return context.json({ message: 'Customer with given mobile number already exists' }, 400);
        await Customer.create({ customerName, customerAddress, customerMobileNum });
        return context.json({ message: 'new customer created successfully' }, 201);
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
        const customerData = customers.map((customer) => ({
            customerId: customer.customerId,
            customerName: customer.customerName,
            customerAddress: customer.customerAddress,
            customerMobileNum: customer.customerMobileNum,
        }));
        return context.json(customerData, 200);
    } catch (err) {
        console.error(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

const getCustomerByMobileNum = async (context) => {
    try {
        const { customerMobileNum } = context.req.validatedData;
        const customers = await Customer.findAll({ where: { customerMobileNum } });
        if (customers.length === 0) return context.json({ message: 'Customer not found' }, 404);
        const customerData = {
            customerId: customers[0].customerId,
            customerName: customers[0].customerName,
            customerAddress: customers[0].customerAddress,
            customerMobileNum: customers[0].customerMobileNum,
        };
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
        return context.json(
            {
                customerId: customer.customerId,
                customerName: customer.customerName,
                customerAddress: customer.customerAddress,
                customerMobileNum: customer.customerMobileNum,
            },
            200
        );
    } catch (err) {
        console.error(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

const getAllTheCustomers = async (context) => {
    try {
        const { page, size } = context.req.validatedData;
        const limit = parseInt(size, 10);
        const offset = (page - 1) * size;

        const customers = await Customer.findAndCountAll({
            limit,
            offset,
            order: [['customerId', 'ASC']], // optional, for ordering results
        });

        return context.json({
            totalItems: customers.count,
            customers: customers.rows.map((customer) => ({
                customerId: customer.customerId,
                customerName: customer.customerName,
                customerAddress: customer.customerAddress,
                customerMobileNum: customer.customerMobileNum,
            })),
            totalPages: Math.ceil(customers.count / limit),
            currentPage: parseInt(page, 10),
        });
    } catch (error) {
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
    getCustomerByMobileNum: [validateInput(customerMobileNumSchema, 'query'), getCustomerByMobileNum],
    getCustomerById: [validateInput(customerIdValidationSchema, 'params'), getCustomerById],
    getAllTheCustomers: [validateInput(paginationSchema, 'query'), getAllTheCustomers],
};

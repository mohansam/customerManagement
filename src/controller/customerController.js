const { Customer } = require('../model/customerModel');

const createNewCustomer = async (context) => {
    const newCustomer = await Customer.create({
        customerName: 'John Doe',
        customerAddress: '123 Main Street',
        customerMobileNum: '1234567890',
    });
    return context.json(newCustomer.toJSON(), 200);
};

module.exports = { createNewCustomer };

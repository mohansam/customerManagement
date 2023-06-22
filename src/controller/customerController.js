// eslint-disable-next-line import/no-unresolved
const { HTTPException } = require('hono/http-exception');
const { Customer } = require('../model/customerModel');
const { validateInput } = require('../middleware/validateInput');
const { customerSchema, customerIdValidationSchema } = require('../schema/customerValidationSchema');

const createNewCustomer = async (context) => {
    try {
        const newCustomer = await Customer.create({
            customerName: context.req.validatedData.customerName,
            customerAddress: context.req.validatedData.customerAddress,
            customerMobileNum: context.req.validatedData.customerMobileNum,
        });
        return context.json(newCustomer.toJSON(), 200);
    } catch (err) {
        console.log(err);
        throw new HTTPException(500, { message: 'Internal server error' });
    }
};

const updateCustomer = async (context) => {
    try {
        const { id } = context.req.params;
        const updatedCustomer = await Customer.update(
            {
                customerName: context.req.validatedData.customerName,
                customerAddress: context.req.validatedData.customerAddress,
                customerMobileNum: context.req.validatedData.customerMobileNum,
            },
            {
                where: { customerId: id },
            }
        );
        if (updatedCustomer[0] === 0) throw new HTTPException(404, { message: 'Customer not found' });
        return context.json({ message: 'Customer updated successfully' }, 200);
    } catch (err) {
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

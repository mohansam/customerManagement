// eslint-disable-next-line import/no-unresolved
const { HTTPException } = require('hono/http-exception');
const { Customer } = require('../model/customerModel');

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

module.exports = { createNewCustomer };

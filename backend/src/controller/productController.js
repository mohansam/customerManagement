/* eslint-disable no-console */
const { Product } = require('../model/productModel');
const { Customer } = require('../model/customerModel');
const { validateInput } = require('../middleware/validateInput');
const { productSchema } = require('../schema/productValidationSchema');

const createNewProduct = async (context) => {
    try {
        const { customerId, productName, dateOfInstallation, warranty, model, pump, membrane, powerSupply } =
            context.req.validatedData;
        const customer = await Customer.findByPk(customerId);
        if (!customer) return context.json({ message: 'Customer not found' }, 404);
        await Product.create({
            productName,
            dateOfInstallation,
            warranty,
            model,
            pump,
            membrane,
            powerSupply,
        });
        return context.json({ message: 'new product created successfully' }, 201);
    } catch (err) {
        console.log(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

module.exports = { createNewProduct: [validateInput(productSchema, 'body'), createNewProduct] };

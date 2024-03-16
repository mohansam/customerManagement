/* eslint-disable no-console */
const { Product } = require('../model/productModel');
const { Customer } = require('../model/customerModel');
const { validateInput } = require('../middleware/validateInput');
const { productSchema, productIdValidationSchema } = require('../schema/productValidationSchema');

const createNewProduct = async (context) => {
    try {
        const { customerId, productName, dateOfInstallation, warranty, model, pump, membrane, powerSupply } =
            context.req.validatedData;
        const customer = await Customer.findByPk(customerId);
        if (!customer) return context.json({ message: 'Customer not found' }, 404);
        await Product.create({
            productName,
            customerId,
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

const getProductById = async (context) => {
    try {
        const { productId } = context.req.validatedData;
        const product = await Product.findByPk(productId);
        if (!product) return context.json({ message: 'Product not found' }, 404);
        return context.json(
            {
                productId: product.productId,
                productName: product.productName,
                customerId: product.customerId,
                dateOfInstallation: product.dateOfInstallation,
                warranty: product.warranty,
                model: product.model,
                pump: product.pump,
                membrane: product.membrane,
                powerSupply: product.powerSupply,
            },
            200
        );
    } catch (err) {
        console.error(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

module.exports = {
    createNewProduct: [validateInput(productSchema, 'body'), createNewProduct],
    getProductById: [validateInput(productIdValidationSchema, 'params'), getProductById],
};

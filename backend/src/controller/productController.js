/* eslint-disable no-console */
const { Op } = require('sequelize');
const { Product } = require('../model/productModel');
const { Customer } = require('../model/customerModel');
const { validateInput } = require('../middleware/validateInput');
const { customerIdValidationSchema, customerMobileNumSchema } = require('../schema/customerValidationSchema');
const { productSchema, productIdValidationSchema } = require('../schema/productValidationSchema');
const { addDaysToDate } = require('../util/util');

const createNewProduct = async (context) => {
    try {
        const {
            customerId,
            productName,
            dateOfInstallation,
            warranty,
            model,
            pump,
            membrane,
            powerSupply,
            reminderDays,
            modeOfPurchase,
        } = context.req.validatedData;
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
            reminderDays,
            modeOfPurchase,
            nextScheduledMaintenance: addDaysToDate(dateOfInstallation, reminderDays),
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
                reminderDays: product.reminderDays,
                modeOfPurchase: product.modeOfPurchase,
                nextScheduledMaintenance: product.nextScheduledMaintenance,
            },
            200
        );
    } catch (err) {
        console.error(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

const getProductsByCustomerId = async (context) => {
    try {
        const { customerId } = context.req.validatedData;
        const products = await Product.findAll({
            where: { customerId },
        });
        const productsData = products.map((product) => ({
            productId: product.productId,
            productName: product.productName,
            customerId: product.customerId,
            dateOfInstallation: product.dateOfInstallation,
            warranty: product.warranty,
            model: product.model,
            pump: product.pump,
            membrane: product.membrane,
            powerSupply: product.powerSupply,
            reminderDays: product.reminderDays,
            modeOfPurchase: product.modeOfPurchase,
            nextScheduledMaintenance: product.nextScheduledMaintenance,
        }));
        return context.json(productsData, 200);
    } catch (err) {
        console.error(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

const getProductsByCustomerMobileNum = async (context) => {
    try {
        const { customerMobileNum } = context.req.validatedData;
        const customers = await Customer.findAll({ where: { customerMobileNum } });
        if (customers.length === 0) return context.json({ message: 'Customer not found' }, 404);
        const products = await Product.findAll({
            where: { customerId: customers[0].customerId },
        });
        const productsData = products.map((product) => ({
            productId: product.productId,
            productName: product.productName,
            customerId: product.customerId,
            dateOfInstallation: product.dateOfInstallation,
            warranty: product.warranty,
            model: product.model,
            pump: product.pump,
            membrane: product.membrane,
            powerSupply: product.powerSupply,
            reminderDays: product.reminderDays,
            modeOfPurchase: product.modeOfPurchase,
            nextScheduledMaintenance: product.nextScheduledMaintenance,
        }));
        return context.json(productsData, 200);
    } catch (err) {
        console.error(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

const getPendingReminders = async (context) => {
    try {
        const currentDate = new Date();
        const products = await Product.findAll({
            where: { nextScheduledMaintenance: { [Op.lt]: currentDate } },
        });
        const productsData = products.map((product) => ({
            productId: product.productId,
            productName: product.productName,
            customerId: product.customerId,
            dateOfInstallation: product.dateOfInstallation,
            warranty: product.warranty,
            model: product.model,
            pump: product.pump,
            membrane: product.membrane,
            powerSupply: product.powerSupply,
            reminderDays: product.reminderDays,
            modeOfPurchase: product.modeOfPurchase,
            nextScheduledMaintenance: product.nextScheduledMaintenance,
        }));
        return context.json(productsData, 200);
    } catch (err) {
        console.error(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

const markReminderAsCompletedByProductId = async (context) => {
    try {
        const { productId } = context.req.validatedData;
        const product = await Product.findByPk(productId);
        if (!product) return context.json({ message: 'Product not found' }, 404);
        const nextScheduledMaintenance = addDaysToDate(product.nextScheduledMaintenance, product.reminderDays);
        const [updatedService] = await Product.update({ nextScheduledMaintenance }, { where: { productId } });
        if (updatedService === 0) return context.json({ message: 'Product not found' }, 404);
        return context.json({ message: 'Service update successfully' }, 200);
    } catch (err) {
        console.log(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

module.exports = {
    createNewProduct: [validateInput(productSchema, 'body'), createNewProduct],
    getProductById: [validateInput(productIdValidationSchema, 'params'), getProductById],
    getProductsByCustomerId: [validateInput(customerIdValidationSchema, 'params'), getProductsByCustomerId],
    getPendingReminders,
    markReminderAsCompletedByProductId: [
        validateInput(productIdValidationSchema, 'params'),
        markReminderAsCompletedByProductId,
    ],
    getProductsByCustomerMobileNum: [validateInput(customerMobileNumSchema, 'query'), getProductsByCustomerMobileNum],
};

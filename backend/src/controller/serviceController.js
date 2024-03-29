/* eslint-disable no-console */
const { Op } = require('sequelize');
const { Service } = require('../model/serviceModel');
const { Product } = require('../model/productModel');
const { Customer } = require('../model/customerModel');
const { validateInput } = require('../middleware/validateInput');
const { serviceSchema, serviceIdValidationSchema } = require('../schema/serviceValidationSchema');
const { customerIdValidationSchema } = require('../schema/customerValidationSchema');
const { productIdValidationSchema } = require('../schema/productValidationSchema');

const createNewService = async (context) => {
    try {
        const {
            customerId,
            productId,
            serviceDate,
            serviceType,
            partsReplaced,
            amountCharged,
            customerRemarks,
            isServiceCompleted,
            productName,
            serviceEngineer,
        } = context.req.validatedData;
        const customer = await Customer.findByPk(customerId);
        if (!customer) return context.json({ message: 'Customer not found' }, 404);
        const product = await Product.findByPk(productId);
        if (!product) return context.json({ message: 'Product not found' }, 404);
        await Service.create({
            customerId,
            productId,
            serviceDate,
            serviceType,
            partsReplaced,
            amountCharged,
            customerRemarks,
            isServiceCompleted,
            productName,
            serviceEngineer,
        });
        return context.json({ message: 'new service created successfully' }, 201);
    } catch (err) {
        console.log(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

const updateService = async (context) => {
    try {
        const { serviceId, customerId, serviceDate, isServiceCompleted, productName, isFreeService, customerName } =
            context.req.validatedData;
        const customer = await Customer.findByPk(customerId);
        if (!customer) return context.json({ message: 'Customer not found' }, 404);
        const [updatedService] = await Service.update(
            { customerId, serviceDate, isServiceCompleted, productName, isFreeService, customerName },
            { where: { serviceId } }
        );
        if (updatedService === 0) return context.json({ message: 'Service not found' }, 404);
        return context.json({ customerId, serviceDate, isServiceCompleted, serviceId }, 200);
    } catch (err) {
        console.log(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

const getServiceByServiceId = async (context) => {
    try {
        const { serviceId } = context.req.validatedData;
        const service = await Service.findByPk(serviceId);
        if (!service) return context.json({ message: 'Service not found' }, 404);
        return context.json(service.toJSON(), 200);
    } catch (err) {
        console.log(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

const getPendingServices = async (context) => {
    try {
        const currentDate = new Date();
        const pendingServices = await Service.findAll({
            where: { serviceDate: { [Op.lt]: currentDate }, isServiceCompleted: false },
        });
        const serviceData = pendingServices.map((pendingService) => ({
            serviceId: pendingService.serviceId,
            customerId: pendingService.customerId,
            productId: pendingService.productId,
            serviceDate: pendingService.serviceDate,
            serviceType: pendingService.serviceType,
            isServiceCompleted: pendingService.isServiceCompleted,
            partsReplaced: pendingService.partsReplaced,
            amountCharged: pendingService.amountCharged,
            customerRemarks: pendingService.customerRemarks,
            serviceEngineer: pendingService.serviceEngineer,
        }));
        return context.json(serviceData, 200);
    } catch (err) {
        console.error(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

const getUpcomingServices = async (context) => {
    try {
        const currentDate = new Date();
        const upComingServices = await Service.findAll({
            where: { serviceDate: { [Op.gt]: currentDate }, isServiceCompleted: false },
        });
        const serviceData = upComingServices.map((upComingService) => ({
            serviceId: upComingService.serviceId,
            customerId: upComingService.customerId,
            productId: upComingService.productId,
            serviceDate: upComingService.serviceDate,
            serviceType: upComingService.serviceType,
            isServiceCompleted: upComingService.isServiceCompleted,
            partsReplaced: upComingService.partsReplaced,
            amountCharged: upComingService.amountCharged,
            customerRemarks: upComingService.customerRemarks,
            serviceEngineer: upComingService.serviceEngineer,
        }));
        return context.json(serviceData, 200);
    } catch (err) {
        console.error(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

const getAllTheServicesBelongsToCustomerId = async (context) => {
    try {
        const { customerId } = context.req.validatedData;
        const services = await Service.findAll({
            where: { customerId },
        });
        const serviceData = services.map((upComingService) => ({
            serviceId: upComingService.serviceId,
            customerId: upComingService.customerId,
            productId: upComingService.productId,
            serviceDate: upComingService.serviceDate,
            serviceType: upComingService.serviceType,
            isServiceCompleted: upComingService.isServiceCompleted,
            partsReplaced: upComingService.partsReplaced,
            amountCharged: upComingService.amountCharged,
            customerRemarks: upComingService.customerRemarks,
            serviceEngineer: upComingService.serviceEngineer,
        }));
        return context.json(serviceData, 200);
    } catch (err) {
        console.error(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

const getAllTheServicesBelongsToProductId = async (context) => {
    try {
        const { productId } = context.req.validatedData;
        const services = await Service.findAll({
            where: { productId },
        });
        const serviceData = services.map((upComingService) => ({
            serviceId: upComingService.serviceId,
            customerId: upComingService.customerId,
            productId: upComingService.productId,
            serviceDate: upComingService.serviceDate,
            serviceType: upComingService.serviceType,
            isServiceCompleted: upComingService.isServiceCompleted,
            partsReplaced: upComingService.partsReplaced,
            amountCharged: upComingService.amountCharged,
            customerRemarks: upComingService.customerRemarks,
            serviceEngineer: upComingService.serviceEngineer,
        }));
        return context.json(serviceData, 200);
    } catch (err) {
        console.error(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

const markServiceAsCompletedByServiceId = async (context) => {
    try {
        const { serviceId } = context.req.validatedData;
        const [updatedService] = await Service.update({ isServiceCompleted: true }, { where: { serviceId } });
        if (updatedService === 0) return context.json({ message: 'Service not found' }, 404);
        return context.json({ message: 'Service update successfully' }, 200);
    } catch (err) {
        console.log(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

module.exports = {
    createNewService: [validateInput(serviceSchema, 'body'), createNewService],
    updateService: [
        validateInput(serviceIdValidationSchema, 'params'),
        validateInput(serviceSchema, 'body'),
        updateService,
    ],
    getServiceByServiceId: [validateInput(serviceIdValidationSchema, 'params'), getServiceByServiceId],
    getPendingServices,
    markServiceAsCompletedByServiceId: [
        validateInput(serviceIdValidationSchema, 'params'),
        markServiceAsCompletedByServiceId,
    ],
    getUpcomingServices,
    getAllTheServicesBelongsToCustomerId: [
        validateInput(customerIdValidationSchema, 'params'),
        getAllTheServicesBelongsToCustomerId,
    ],
    getAllTheServicesBelongsToProductId: [
        validateInput(productIdValidationSchema, 'params'),
        getAllTheServicesBelongsToProductId,
    ],
};

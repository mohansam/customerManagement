/* eslint-disable no-console */
const { Op } = require('sequelize');
const { Service } = require('../model/serviceModel');
const { Customer } = require('../model/customerModel');
const { validateInput } = require('../middleware/validateInput');
const { serviceSchema, serviceIdValidationSchema } = require('../schema/serviceValidationSchema');
const { customerIdValidationSchema } = require('../schema/customerValidationSchema');

const createNewService = async (context) => {
    try {
        const { customerId, serviceDate, isServiceCompleted, productName, isFreeService, customerName } =
            context.req.validatedData;
        const customer = await Customer.findByPk(customerId);
        if (!customer) return context.json({ message: 'Customer not found' }, 404);
        const newService = await Service.create({
            customerId,
            customerName,
            serviceDate,
            isServiceCompleted,
            productName,
            isFreeService,
        });
        return context.json(newService.toJSON(), 200);
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

const getServiceByCustomerId = async (context) => {
    try {
        const { customerId } = context.req.validatedData;
        const services = await Service.findAll({ where: { customerId } });
        const serviceData = services.map((service) => service.toJSON());
        return context.json(serviceData, 200);
    } catch (err) {
        console.log(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

const getPendingServices = async (context) => {
    try {
        const currentDate = new Date();
        // Find all services where serviceDate is less than the current date and isServiceCompleted is false
        const pendingServices = await Service.findAll({
            where: { serviceDate: { [Op.lt]: currentDate }, isServiceCompleted: false },
        });
        const serviceData = pendingServices.map((pendingService) => pendingService.toJSON());
        return context.json(serviceData, 200);
    } catch (err) {
        console.error(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

const getUpcomingServices = async (context) => {
    try {
        const currentDate = new Date();
        const pendingServices = await Service.findAll({
            where: { serviceDate: { [Op.gt]: currentDate }, isServiceCompleted: false },
        });
        const serviceData = pendingServices.map((pendingService) => pendingService.toJSON());
        return context.json(serviceData, 200);
    } catch (err) {
        console.error(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

const getAllTheServicesBelongsToCustomerId = async (context) => {
    const { customerId } = context.req.validatedData;
    const services = await Service.findAll({
        where: { customerId },
    });
    return context.json(services, 200);
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
    getServiceByCustomerId: [validateInput(customerIdValidationSchema, 'params'), getServiceByCustomerId],
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
};

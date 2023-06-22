const { Service } = require('../model/serviceModel');
const { Customer } = require('../model/customerModel');
const { validateInput } = require('../middleware/validateInput');
const { serviceSchema, serviceIdValidationSchema } = require('../schema/serviceValidationSchema');
const { customerIdValidationSchema } = require('../schema/customerValidationSchema');

const createNewService = async (context) => {
    try {
        const { customerId, serviceDate, isServiceCompleted } = context.req.validatedData;
        const customer = await Customer.findByPk(customerId);
        if (!customer) return context.json({ message: 'Customer not found' }, 404);
        const newService = await Service.create({ customerId, serviceDate, isServiceCompleted });
        return context.json(newService.toJSON(), 200);
    } catch (err) {
        console.log(err);
        return context.json({ message: 'Internal server error' }, 500);
    }
};

const updateService = async (context) => {
    try {
        const { serviceId, customerId, serviceDate, isServiceCompleted } = context.req.validatedData;
        const customer = await Customer.findByPk(customerId);
        if (!customer) return context.json({ message: 'Customer not found' }, 404);
        const [updatedService] = await Service.update(
            { customerId, serviceDate, isServiceCompleted },
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
        if (services.length === 0)
            return context.json({ message: `There is no service scheduled for given customer` }, 404);
        const serviceData = services.map((service) => service.toJSON());
        return context.json(serviceData, 200);
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
};

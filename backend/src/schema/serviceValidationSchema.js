const Joi = require('joi');

const serviceSchema = Joi.object({
    customerId: Joi.string().guid({ version: 'uuidv4' }).required().messages({
        'string.guid': 'customerId must be a valid UUID',
        'any.required': 'customerId is a required field',
    }),
    productId: Joi.string().guid({ version: 'uuidv4' }).required().messages({
        'string.guid': 'productId must be a valid UUID',
        'any.required': 'productId is a required field',
    }),
    serviceDate: Joi.date().iso().required().messages({
        'date.base': 'Invalid dateOfInstallation date, must be a valid date',
        'date.format': 'Invalid dateOfInstallation date format, must be in ISO 8601 format',
        'any.required': 'dateOfInstallation value is required',
    }),
    serviceType: Joi.string()
        .valid('installation', 'service request', 'mandatory service', 'contract service', 'free service')
        .required()
        .messages({
            'string.base': 'serviceType must be a string',
            'any.only':
                'serviceType must be one of installation, service request, mandatory service, contract service, free service',
            'any.required': 'serviceType is a required field',
        }),
    isServiceCompleted: Joi.boolean().required().messages({
        'boolean.base': 'isServiceCompleted must be a boolean',
        'any.required': 'isServiceCompleted is a required field',
    }),
    partsReplaced: Joi.string().allow('', null).messages({
        'string.base': 'partsReplaced must be a string',
    }),
    amountCharged: Joi.number().precision(2).allow(null).messages({
        'number.base': 'amountCharged must be a number',
        'number.precision': 'amountCharged can have at most 2 decimal places',
    }),
    customerRemarks: Joi.string().allow('', null).messages({
        'string.base': 'customerRemarks must be a string',
    }),
    serviceEngineer: Joi.string().required().max(50).messages({
        'string.base': 'Customer name must be a string',
        'any.required': 'Customer name is required',
        'string.max': 'Customer name should not exceed {#limit} characters',
    }),
}).messages({
    'any.required': '{{#label}} is a required field',
});

const serviceIdValidationSchema = Joi.object({
    serviceId: Joi.string()
        .guid({
            version: ['uuidv4'], // Optional: specify UUID version(s) to validate against
        })
        .required()
        .messages({
            'string.guid': 'Invalid ID, must be a valid UUID',
            'any.required': 'ID is required',
        }),
});

module.exports = { serviceSchema, serviceIdValidationSchema };

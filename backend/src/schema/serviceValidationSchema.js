const Joi = require('joi');

const serviceSchema = Joi.object({
    customerId: Joi.string()
        .guid({
            version: ['uuidv4'], // Optional: specify UUID version(s) to validate against
        })
        .required()
        .messages({
            'string.guid': 'Invalid ID, must be a valid UUID',
            'any.required': 'ID is required',
        }),
    productId: Joi.string()
        .guid({
            version: ['uuidv4'], // Optional: specify UUID version(s) to validate against
        })
        .required()
        .messages({
            'string.guid': 'Invalid ID, must be a valid UUID',
            'any.required': 'ID is required',
        }),
    customerName: Joi.string().required().max(50).messages({
        'string.base': 'Customer name must be a string',
        'any.required': 'Customer name is required',
        'string.max': 'Customer name should not exceed {#limit} characters',
    }),
    serviceDate: Joi.date().iso().required().messages({
        'date.base': 'Invalid service date, must be a valid date',
        'date.format': 'Invalid service date format, must be in ISO 8601 format',
        'any.required': 'Service date is required',
    }),
    isServiceCompleted: Joi.boolean().required().messages({
        'boolean.base': 'Invalid value for isServiceCompleted, must be a boolean',
        'any.required': 'isServiceCompleted is required',
    }),
    productName: Joi.string().max(100).required().messages({
        'string.base': 'Invalid product name, must be a string',
        'string.max': 'Product name must not exceed 1000 characters',
        'any.required': 'Product name is required',
    }),
    isFreeService: Joi.boolean().required().messages({
        'boolean.base': 'Invalid value for isFreeService, must be a boolean',
        'any.required': 'isFreeService is required',
    }),
});

const serviceIdValidationSchema = Joi.object({
    serviceId: Joi.number().integer().positive().required().messages({
        'number.base': 'Invalid ID, must be a number',
        'number.integer': 'Invalid ID, must be an integer',
        'number.positive': 'Invalid ID, must be a positive number',
        'any.required': 'ID is required',
    }),
});

module.exports = { serviceSchema, serviceIdValidationSchema };

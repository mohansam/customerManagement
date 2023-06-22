const Joi = require('joi');

const customerSchema = Joi.object({
    customerName: Joi.string().required().max(50).messages({
        'string.base': 'Customer name must be a string',
        'any.required': 'Customer name is required',
        'string.max': 'Customer name should not exceed {#limit} characters',
    }),
    customerAddress: Joi.string().max(100).required().messages({
        'string.base': 'Customer address must be a string.',
        'string.max': 'Customer address cannot exceed 100 characters.',
        'any.required': 'Customer address is required.',
    }),
    customerMobileNum: Joi.string()
        .pattern(/^\d{10}$/)
        .required()
        .messages({
            'string.pattern.base': 'Customer mobile number must be a 10-digit number.',
            'any.required': 'Customer mobile number is required.',
        }),
});

const customerNameSchema = Joi.object({
    customerName: Joi.string().required().max(50).messages({
        'string.base': 'Customer name must be a string',
        'any.required': 'Customer name is required',
        'string.max': 'Customer name should not exceed {#limit} characters',
    }),
});

const customerIdValidationSchema = Joi.object({
    customerId: Joi.number().integer().positive().required().messages({
        'number.base': 'Invalid ID, must be a number',
        'number.integer': 'Invalid ID, must be an integer',
        'number.positive': 'Invalid ID, must be a positive number',
        'any.required': 'ID is required',
    }),
});

module.exports = { customerSchema, customerIdValidationSchema, customerNameSchema };

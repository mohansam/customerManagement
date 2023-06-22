const Joi = require('joi');

const customerSchema = Joi.object({
    customerName: Joi.string().required().messages({
        'any.required': 'Customer name is required.',
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

const customerIdValidationSchema = Joi.object({
    customerId: Joi.number().integer().positive().required().messages({
        'number.base': 'Invalid ID, must be a number',
        'number.integer': 'Invalid ID, must be an integer',
        'number.positive': 'Invalid ID, must be a positive number',
        'any.required': 'ID is required',
    }),
});

module.exports = { customerSchema, customerIdValidationSchema };

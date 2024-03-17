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

const customerMobileNumSchema = Joi.object({
    customerMobileNum: Joi.string()
        .pattern(/^\d{10}$/)
        .required()
        .messages({
            'string.pattern.base': 'Customer mobile number must be a 10-digit number.',
            'any.required': 'Customer mobile number is required.',
        }),
});

const customerIdValidationSchema = Joi.object({
    customerId: Joi.string()
        .guid({
            version: ['uuidv4'], // Optional: specify UUID version(s) to validate against
        })
        .required()
        .messages({
            'string.guid': 'Invalid ID, must be a valid UUID',
            'any.required': 'ID is required',
        }),
});

const paginationSchema = Joi.object({
    page: Joi.number()
        .integer()
        .min(1) // Ensure page number is at least 1
        .default(1) // Default to 1 if not specified
        .optional(), // Make this parameter optional
    size: Joi.number()
        .integer()
        .min(1) // Ensure size is at least 1
        .max(100) // Optionally set a maximum size to avoid too large requests
        .default(10) // Default to 10 if not specified
        .optional(), // Make this parameter optional
});

module.exports = {
    customerSchema,
    customerIdValidationSchema,
    customerNameSchema,
    paginationSchema,
    customerMobileNumSchema,
};

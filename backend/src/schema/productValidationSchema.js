const Joi = require('joi');

const productSchema = Joi.object({
    customerId: Joi.number().integer().positive().required().messages({
        'number.base': 'Invalid customer ID, must be a number',
        'number.integer': 'Invalid customer ID, must be an integer',
        'number.positive': 'Invalid customer ID, must be a positive number',
        'any.required': 'Customer ID is required',
    }),
    productName: Joi.string().max(100).required().messages({
        'string.base': 'Invalid product name, must be a string',
        'string.max': 'Product name must not exceed 1000 characters',
        'any.required': 'Product name is required',
    }),
    dateOfInstallation: Joi.date().iso().required().messages({
        'date.base': 'Invalid dateOfInstallation date, must be a valid date',
        'date.format': 'Invalid dateOfInstallation date format, must be in ISO 8601 format',
        'any.required': 'dateOfInstallation value is required',
    }),
    warranty: Joi.string().max(100).required().messages({
        'string.base': 'Invalid warranty value, must be a string',
        'string.max': 'warranty value must not exceed 1000 characters',
        'any.required': 'warranty value is required',
    }),
    model: Joi.string().max(100).required().messages({
        'string.base': 'Invalid model value, must be a string',
        'string.max': 'model value must not exceed 1000 characters',
        'any.required': 'model value is required',
    }),
    pump: Joi.string().max(100).required().messages({
        'string.base': 'Invalid pump value, must be a string',
        'string.max': 'pump value must not exceed 1000 characters',
        'any.required': 'pump value is required',
    }),
    membrane: Joi.string().max(100).required().messages({
        'string.base': 'Invalid membrane value, must be a string',
        'string.max': 'membrane value must not exceed 1000 characters',
        'any.required': 'membrane value is required',
    }),
    powerSupply: Joi.string().max(100).required().messages({
        'string.base': 'Invalid powerSupply value, must be a string',
        'string.max': 'powerSupply must not exceed 1000 characters',
        'any.required': 'powerSupply value is required',
    }),
});

module.exports = { productSchema };

const { sequelize } = require('../Db/dbClient');

const sanitizeValue = (value) => {
    if (typeof value === 'string') return sequelize.escape(value).slice(1, -1);
    return value;
};

const getInputData = async (context, source) => {
    switch (source) {
        case 'params':
            return context.req.param();
        case 'body':
            return context.req.json();
        case 'query':
            return context.req.query();
        default:
            return context.json({ message: 'Internal server error' }, 500);
    }
};

const validateInput =
    (schema, source = 'body') =>
    async (context, next) => {
        const inputData = await getInputData(context, source);
        const { error, value } = schema.validate(inputData);
        if (error) return context.json({ message: error.details[0].message }, 400);
        const sanitizedValue = {};
        Object.keys(value).forEach((key) => {
            sanitizedValue[key] = sanitizeValue(value[key]);
        });
        context.req.validatedData = { ...context.req.validatedData, ...sanitizedValue };
        return next();
    };

module.exports = { validateInput };

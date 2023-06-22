// eslint-disable-next-line import/no-unresolved
const { HTTPException } = require('hono/http-exception');

const getInputData = async (context, source) => {
    switch (source) {
        case 'params':
            return context.req.param();
        case 'body':
            return context.req.json();
        default:
            throw new HTTPException(500, { message: 'internal server error' });
    }
};

const validateInput =
    (schema, source = 'body') =>
    async (context, next) => {
        const inputData = await getInputData(context, source);
        const { error, value } = schema.validate(inputData);
        if (error) throw new HTTPException(400, { message: error.details[0].message });
        context.req.validatedData = { ...context.req.validatedData, ...value };
        return next();
    };

module.exports = { validateInput };

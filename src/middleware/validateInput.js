// eslint-disable-next-line import/no-unresolved
const { HTTPException } = require('hono/http-exception');

const validateInput = (schema) => async (context, next) => {
    const resBody = await context.req.json();
    const { error, value } = schema.validate(resBody);
    if (error) throw new HTTPException(400, { message: error.details[0].message });
    context.req.validatedData = value;
    return next();
};

module.exports = { validateInput };

/* eslint-disable import/no-unresolved */
const { Hono } = require('hono');
const { handle } = require('hono/aws-lambda');
const { customerRoute } = require('./route/customerRoute');
const { serveStatic } = require('./middleware/serveStaticFromLambda');

const app = new Hono();

app.use('*', serveStatic({ root: 'public' }));

app.get('/', async (context) => context.json({ statusMessage: 'hello from customer management' }, 200));

app.route('/api/v1/customer', customerRoute);

const handler = async (event) => {
    const httpHandler = handle(app);
    const httpRes = await httpHandler(event);
    return httpRes;
};

module.exports = { handler };

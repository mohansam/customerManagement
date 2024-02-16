/* eslint-disable import/no-unresolved */
require('dotenv').config();
const { Hono } = require('hono');
const { cors } = require('hono/cors');
const { handle } = require('hono/aws-lambda');
const { customerRoute } = require('./route/customerRoute');
const { serviceRoute } = require('./route/serviceRoute');
const { connectToDb } = require('./Db/dbConnection');

const app = new Hono();

app.get('/', async (context) => context.json({ statusMessage: 'hello from customer management' }, 200));

app.use('/api/*', cors());
app.use(
    '/api/*',
    cors({
        origin: 'https://www.customer-managment.pages.dev',
        allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
        allowMethods: ['POST', 'GET', 'OPTIONS'],
        exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
        maxAge: 600,
        credentials: true,
    })
);

app.route('/api/v1/customer', customerRoute);
app.route('/api/v1/service', serviceRoute);

const handler = async (event) => {
    await connectToDb();
    const httpHandler = handle(app);
    const httpRes = await httpHandler(event);
    return httpRes;
};

module.exports = { handler };

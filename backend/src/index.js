/* eslint-disable import/no-unresolved */
require('dotenv').config();
const { Hono } = require('hono');
const { cors } = require('hono/cors');
const { handle } = require('hono/aws-lambda');
const { customerRoute } = require('./route/customerRoute');
const { serviceRoute } = require('./route/serviceRoute');
const { productRoute } = require('./route/productRoute');
const { connectToDb } = require('./Db/dbConnection');

const app = new Hono();

const { FRONT_END_ORIGIN_URI } = process.env;

app.use(
    '/api/v1/*',
    cors({
        origin: [FRONT_END_ORIGIN_URI, 'https://editor-next.swagger.io', 'http://localhost:3000'],
    })
);

app.get('/', async (context) => context.json({ statusMessage: 'hello from customer management' }, 200));
app.route('/api/v1/customer', customerRoute);
app.route('/api/v1/service', serviceRoute);
app.route('/api/v1/product', productRoute);

const handler = async (event) => {
    await connectToDb();
    const httpHandler = handle(app);
    const httpRes = await httpHandler(event);
    return httpRes;
};

module.exports = { handler };

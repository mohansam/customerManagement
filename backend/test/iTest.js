const { event } = require('./event');
const { handler } = require('../src/index');

const iTest = async () => {
    const res = await handler(event);
    console.log(res);
};

iTest();

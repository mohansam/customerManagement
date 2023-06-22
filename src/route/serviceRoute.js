const { Hono } = require('hono');
const {
    createNewService,
    updateService,
    getServiceByServiceId,
    getServiceByCustomerId,
} = require('../controller/serviceController');

const serviceRoute = new Hono();

serviceRoute.post('/createNewService', ...createNewService);
serviceRoute.put('/updateService/:serviceId', ...updateService);
serviceRoute.get('/getServiceByServiceId/:serviceId', ...getServiceByServiceId);
serviceRoute.get('/getServiceByCustomerId/:customerId', ...getServiceByCustomerId);

module.exports = { serviceRoute };

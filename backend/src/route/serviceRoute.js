const { Hono } = require('hono');
const {
    createNewService,
    updateService,
    getServiceByServiceId,
    getServiceByCustomerId,
    getPendingServices,
    markServiceAsCompletedByServiceId,
    getUpcomingServices,
} = require('../controller/serviceController');

const serviceRoute = new Hono();

serviceRoute.post('/createNewService', ...createNewService);
serviceRoute.put('/updateService/:serviceId', ...updateService);
serviceRoute.get('/getServiceByServiceId/:serviceId', ...getServiceByServiceId);
serviceRoute.get('/getServiceByCustomerId/:customerId', ...getServiceByCustomerId);
serviceRoute.get('/getPendingServices', getPendingServices);
serviceRoute.get('/getUpcomingServices', getUpcomingServices);
serviceRoute.post('/markServiceAsCompletedByServiceId/:serviceId', ...markServiceAsCompletedByServiceId);

module.exports = { serviceRoute };

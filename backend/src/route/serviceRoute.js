const { Hono } = require('hono');
const {
    createNewService,
    updateService,
    getServiceByServiceId,
    getPendingServices,
    markServiceAsCompletedByServiceId,
    getUpcomingServices,
    getAllTheServicesBelongsToCustomerId,
    getAllTheServicesBelongsToProductId,
} = require('../controller/serviceController');

const serviceRoute = new Hono();

serviceRoute.post('/createNewService', ...createNewService);
serviceRoute.put('/updateService/:serviceId', ...updateService);
serviceRoute.get('/getServiceByServiceId/:serviceId', ...getServiceByServiceId);
serviceRoute.get('/getPendingServices', getPendingServices);
serviceRoute.get('/getUpcomingServices', getUpcomingServices);
serviceRoute.put('/markServiceAsCompletedByServiceId/:serviceId', ...markServiceAsCompletedByServiceId);
serviceRoute.get('/getAllTheServicesBelongsToCustomerId/:customerId', ...getAllTheServicesBelongsToCustomerId);
serviceRoute.get('/getAllTheServicesBelongsToProductId/:productId', ...getAllTheServicesBelongsToProductId);

module.exports = { serviceRoute };

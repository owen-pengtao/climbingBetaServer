const Router = require('koa-router');
const controller = require('./controller');
const router = new Router();

// General ROUTES
router.get('/', controller.general.helloWorld);
router.get('/jwt', controller.general.getJwtPayload);

// Zone ROUTES
router.get('/zones', controller.zone.getZones);
router.get('/zones/:name', controller.zone.getZoneByName);
router.post('/zones', controller.zone.createZone);
router.put('/zones/:name', controller.zone.updateZoneByName);
router.delete('/zones/:name', controller.zone.deleteZoneByName);

// Route ROUTES
router.get('/routes/:zoneId', controller.route.getRoutesByZoneId);
router.get('/route/:routeId', controller.route.getRouteByRouteId);
router.post('/route', controller.route.createRoute);
router.put('/route/:routeId', controller.route.updateRouteByRouteId);
router.delete('/route/:routeId', controller.route.deleteRouteByRouteId);

export { router };

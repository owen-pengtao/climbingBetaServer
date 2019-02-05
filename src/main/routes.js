"use strict";
const Router = require('koa-router');
const controller = require('./controller');
const router = new Router();
exports.router = router;
// GENERAL ROUTES
router.get('/', controller.general.helloWorld);
router.get('/jwt', controller.general.getJwtPayload);
// ZONE ROUTES
router.get('/zones', controller.zone.getZones);
router.get('/zones/:name', controller.zone.getZoneByName);
router.post('/zones', controller.zone.createZone);
router.put('/zones/:name', controller.zone.updateZoneByName);
router.delete('/zones/:name', controller.zone.deleteZoneByName);
//# sourceMappingURL=routes.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const zoneModel_1 = require('../model/zoneModel');
const validate = {
    reqDataForCreateZone: (ctx) => __awaiter(this, void 0, void 0, function* () {
        yield ctx.validate({
            name: 'required|string|minLength:0|maxLength:32',
            totalRoutes: 'required|numeric',
            totalBetas: 'required|numeric',
            image: 'required|string',
        }, ctx.request.body);
    }),
    reqDataForUpdateZoneByName: (ctx) => __awaiter(this, void 0, void 0, function* () {
        yield ctx.validate({
            name: 'string|minLength:0|maxLength:32',
            totalRoutes: 'numeric',
            totalBetas: 'numeric',
            image: 'string',
        }, ctx.request.body);
    })
};
class ZoneController {
    static getZones(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            yield zoneModel_1.default.find().then((data) => {
                ctx.body = data;
            }, (err) => {
                ctx.body = err.message;
            });
        });
    }
    static getZoneByName(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let name = ctx.params.name || '';
            if (name) {
                yield zoneModel_1.default.findOne({ 'name': name }).then((data) => {
                    ctx.body = data;
                }, (err) => {
                    ctx.body = err.message;
                });
            }
            else {
                ctx.status = 400;
            }
        });
    }
    static createZone(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            validate.reqDataForCreateZone(ctx);
            yield zoneModel_1.default.create(ctx.request.body).then((data) => {
                ctx.body = data;
            }, (err) => {
                ctx.status = 500;
                ctx.body = err.message;
            });
        });
    }
    static updateZoneByName(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            validate.reqDataForUpdateZoneByName(ctx);
            let name = ctx.params.name || '';
            if (name) {
                yield zoneModel_1.default.updateOne({ 'name': name }, {
                    $set: ctx.request.body
                }).then((res) => {
                    if (res.ok && res.nModified) {
                        ctx.body = ctx.request.body;
                    }
                    else {
                        ctx.status = 304;
                    }
                }, (err) => {
                    ctx.status = 500;
                    ctx.body = err.message;
                });
            }
            else {
                ctx.status = 400;
            }
        });
    }
    static deleteZoneByName(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let name = ctx.params.name || '';
            if (name) {
                yield zoneModel_1.default.deleteOne({ 'name': name }).then((data) => {
                    ctx.body = data;
                }, (err) => {
                    ctx.status = 500;
                    ctx.body = err.message;
                });
            }
            else {
                ctx.status = 400;
            }
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ZoneController;
//# sourceMappingURL=zone.js.map
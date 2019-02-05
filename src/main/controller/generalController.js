"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class GeneralController {
    static helloWorld(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.body = 'Hello World!';
        });
    }
    // silly endpoint to show where the payload data from the token gets stored
    static getJwtPayload(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            // example just to set a different status
            ctx.status = 201;
            // the body of the response will contain the information contained as payload in the JWT
            ctx.body = ctx.state.user;
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GeneralController;
//# sourceMappingURL=general.js.map
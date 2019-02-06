import { BaseContext } from 'koa';
import Route from '../model/routeModel';

const validate = {
  reqDataForCreateRoute: async (ctx) => {
    await ctx.validate({
      zoneId: 'required|string',
      totalBetas: 'required|numeric',
      routeSetter: 'required|string',
      color: 'required|string',
      date: 'required|dateFormat:MM/DD/YYYY',
      grade: 'required|string',
      images: 'required|array',
      'images.*': 'required|string',
    }, ctx.request.body);
  },
  reqDataForUpdateRouteByRouteId: async (ctx) => {
    await ctx.validate({
      totalBetas: 'numeric',
      routeSetter: 'string',
      color: 'string',
      date: 'dateFormat:MM/DD/YYYY',
      grade: 'string',
      images: 'array',
      'images.*': 'string',
    }, ctx.request.body);
  },
};


export default class routeController {
  public static async getRoutesByZoneId(ctx: BaseContext) {
    const zoneId = ctx.params.zoneId || '';
    if (zoneId) {
      // Note: {zoneId} is as same as {'zoneId': zoneId}, because of key name matches name of the assigned variable
      await Route.find({zoneId}).then((data) => {
        ctx.body = data;
      }, (err) => {
        ctx.body = err.message;
      });
    } else {
      ctx.status = 400;
    }
  }

  public static async getRouteByRouteId(ctx: BaseContext) {
    const routeId = ctx.params.routeId || '';
    if (routeId) {
      await Route.findOne({'_id': routeId}).then((data) => {
        ctx.body = data;
      }, (err) => {
        ctx.body = err.message;
      });
    } else {
      ctx.status = 400;
    }
  }

  public static async createRoute(ctx: BaseContext) {
    validate.reqDataForCreateRoute(ctx);

    await Route.create(ctx.request.body).then((data) => {
      ctx.body = data;
    }, (err) => {
      ctx.status = 500;
      ctx.body = err.message;
    });
  }

  public static async updateRouteByRouteId(ctx: BaseContext) {
    validate.reqDataForUpdateRouteByRouteId(ctx);

    const routeId = ctx.params.routeId || '';
    if (routeId) {
      await Route.updateOne({'_id': routeId}, {
        $set: ctx.request.body,
      }).then((res) => {
        if (res.ok && res.nModified) {
          ctx.body = ctx.request.body;
        } else {
          ctx.status = 304;
        }
      }, (err) => {
        ctx.status = 500;
        ctx.body = err.message;
      });
    } else {
      ctx.status = 400;
    }
  }

  public static async deleteRouteByRouteId(ctx: BaseContext) {
    const routeId = ctx.params.routeId || '';
    if (routeId) {
      await Route.deleteOne({'_id': routeId}).then((data) => {
        ctx.body = data;
      }, (err) => {
        ctx.status = 500;
        ctx.body = err.message;
      });
    } else {
      ctx.status = 400;
    }
  }
}

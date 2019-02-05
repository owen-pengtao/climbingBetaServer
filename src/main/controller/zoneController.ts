import { BaseContext } from 'koa';
import Zone from '../model/zoneModel';

const validate = {
  reqDataForCreateZone: async (ctx) => {
    await ctx.validate({
      name: 'required|string|minLength:0|maxLength:32',
      totalRoutes: 'required|numeric',
      totalBetas: 'required|numeric',
      image: 'required|string',
    }, ctx.request.body);
  },
  reqDataForUpdateZoneByName: async (ctx) => {
    await ctx.validate({
      name: 'string|minLength:0|maxLength:32',
      totalRoutes: 'numeric',
      totalBetas: 'numeric',
      image: 'string',
    }, ctx.request.body);
  }
};

export default class ZoneController {
  public static async getZones (ctx: BaseContext) {
    await Zone.find().then((data) => {
      ctx.body = data;
    }, (err) => {
      ctx.body = err.message;
    });
  }

  public static async getZoneByName (ctx: BaseContext) {
    let name = ctx.params.name || '';
    if (name) {
      await Zone.findOne({'name': name}).then((data) => {
        ctx.body = data;
      }, (err) => {
        ctx.body = err.message;
      });
    } else {
      ctx.status = 400;
    }
  }

  public static async createZone (ctx: BaseContext) {
    validate.reqDataForCreateZone(ctx);

    await Zone.create(ctx.request.body).then((data) => {
      ctx.body = data;
    }, (err) => {
      ctx.status = 500;
      ctx.body = err.message;
    });
  }

  public static async updateZoneByName (ctx: BaseContext) {
    validate.reqDataForUpdateZoneByName(ctx);

    let name = ctx.params.name || '';
    if (name) {
      await Zone.updateOne({'name': name}, {
        $set: ctx.request.body
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

  public static async deleteZoneByName (ctx: BaseContext) {
    let name = ctx.params.name || '';
    if (name) {
      await Zone.deleteOne({'name': name}).then((data) => {
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
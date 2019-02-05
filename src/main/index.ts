import * as cors from '@koa/cors';
import * as dotenv from 'dotenv';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as convert from 'koa-convert';
import * as helmet from 'koa-helmet';
import * as mongoose from 'mongoose';
import * as validator from 'node-input-validator';
import { config } from './conf/config';
import { router } from './routes';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' });

mongoose.connect(config.databaseUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
const app = new Koa();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // Provides important security headers to make your app more secure
  app.use(helmet());

  // Enable cors with default options
  app.use(cors());

  // Enable bodyParser with default options
  app.use(convert(bodyParser()));
  app.use(validator.koa());

  // JWT middleware -> below this line routes are only reached if JWT token is valid, secret as env variable
  // app.use(jwt({ secret: config.jwtSecret }));

  // this routes are protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
  app.use(router.routes()).use(router.allowedMethods());
});

module.exports = app.listen(config.port);

"use strict";
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert');
const mongoose = require('mongoose');
const helmet = require('koa-helmet');
const cors = require('@koa/cors');
const dotenv = require('dotenv');
const validator = require('node-input-validator');
const config_1 = require('./conf/config');
// import { logger } from './common/logging';
// import { zone } from './zone/';
const routes_1 = require('./routes');
// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' });
mongoose.connect(config_1.config.databaseUrl, {
    useNewUrlParser: true,
    useCreateIndex: true
});
const app = new Koa();
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
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
    app.use(routes_1.router.routes()).use(routes_1.router.allowedMethods());
});
module.exports = app.listen(config_1.config.port);
//# sourceMappingURL=index.js.map
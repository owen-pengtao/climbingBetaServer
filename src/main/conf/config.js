"use strict";
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const config = {
    port: +process.env.PORT || 3000,
    debugLogging: process.env.NODE_ENV == 'development',
    dbsslconn: process.env.NODE_ENV != 'development',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-whatever',
    databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/climbingBeta'
};
exports.config = config;
//# sourceMappingURL=config.js.map
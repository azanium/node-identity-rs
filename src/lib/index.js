/*
 * index.js
 *
 * Created by Suhendra Ahmad
 * Mon Jan 07 2019 10:54:47 GMT+0800 (Malaysia Time)
 */

const { authenticateMiddleware } = require('./authenticate.middleware');

module.exports = authenticateMiddleware;

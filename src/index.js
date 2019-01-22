/*
 * index.js
 *
 * Created by Suhendra Ahmad
 * Mon Jan 10 2019 22:13:47 GMT+0800 (Malaysia Time)
 */

const ResourceServer = require('@ainasoft/oidc-rs');
const { authenticate, authenticatePermissions } = require('./lib');

module.exports = {
  authenticate,
  authenticatePermissions,
  ResourceServer
};

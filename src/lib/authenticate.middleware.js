/*
 * authenticate.middleware.js
 *
 * Created by Suhendra Ahmad
 * Mon Jan 07 2019 10:54:47 GMT+0800 (Malaysia Time)
 */
const ARN = require('node-arn');
const ResourceServer = require('@ainasoft/oidc-rs');  // eslint-disable-line

/**
 * Authenticate Middleware
 *
 */
const authenticateMiddleware = (resourceName, qualifier, opts) => {
  const rs = new ResourceServer();
  const options = opts || {};
  if (!options.allow) {
    options.allow = {};
  }
  let { permissions } = options.allow;
  if (!permissions) {
    permissions = [];
  }

  const permArn = new ARN(ARN.getArtifacts().permission, '*', resourceName, qualifier);
  const perm = permArn.toString();
  if (permissions.indexOf(perm) < 0) {
    permissions.push(perm);
  }
  options.allow.permissions = permissions;

  // Integration test should never use auth
  if (process.env.NODE_ENV === 'test') {
    return (req, res, next) => next();
  }
  return rs.authenticate(options);
};


module.exports = {
  authenticateMiddleware
};

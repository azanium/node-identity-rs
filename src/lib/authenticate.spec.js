/*
 * authenticate.spec.js
 *
 * Created by Suhendra Ahmad
 * Mon Jan 07 2019 10:54:47 GMT+0800 (Malaysia Time)
 */

/* eslint-disable arrow-body-style */
const ResourceServer = require('@ainasoft/oidc-rs');
const authenticateMiddleware = require('./authenticate.middleware');

jest.mock('@ainasoft/oidc-rs');

describe('Middleware - authenticateMiddleware', () => {
  const req = {};
  const res = {};
  const next = jest.fn();

  beforeEach(() => {});

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should pass without options', () => {
    authenticateMiddleware.authenticateMiddleware('oidc', 'read')(req, res, next);
    expect(next).toBeCalledTimes(1);
  });

  test('should pass with allow options', () => {
    authenticateMiddleware.authenticateMiddleware('oidc', 'read', { allow: { permissions: ['arn'] } })(req, res, next);
    expect(next).toBeCalledTimes(1);
  });

  test('should pass by overwriting exisiting allow permission options', () => {
    authenticateMiddleware.authenticateMiddleware('oidc', 'read', { allow: { permissions: ['arn:permission:*:oidc/read'] } })(req, res, next);
    expect(next).toBeCalledTimes(1);
  });

  test('should pass request', () => {
    authenticateMiddleware.authenticateMiddleware('', '', {})(req, res, next);
    expect(next).toBeCalledTimes(1);
  });

  test('should pass request on development environment', () => {
    process.env.NODE_ENV = 'development';
    ResourceServer.prototype.authenticate = jest.fn().mockImplementation(() => (cReq, cRes, cb) => cb());
    authenticateMiddleware.authenticateMiddleware('', '', { hello: 'hello' })(req, res, next);
    expect(next).toBeCalledTimes(1);
  });
});

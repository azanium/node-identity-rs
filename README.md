# node-identity-rs
Node Identity Resource Service Authentication Middleware for Express JS

## Requirements

 - [Node v7.6+](https://nodejs.org/en/download/current/)
 - [Yarn](https://yarnpkg.com/en/docs/install)

## Install

```bash
$ yarn add identity-rs
```

## Usage
```javascript
const { authenticateMiddleware } = require('identity-rs');

// add into ExpressJS
authenticateMiddleware(resourceName, qualifier, options),
```
resourceName is the name you use for your service
qualifier is the access level for permissions, eg: read, write, * (read-write).

## Middleware options

No configuration is _required_ in order to start using this middleware. All options are optional.

```javascript
authenticateMiddleware(resourceName, qualifier, {
  realm: 'user',
  scopes: ['foo', 'bar'],
  allow: {
    issuers: ['https://forge.anvil.io'],
    audience: ['clientid1', 'clientid2'],
    subjects: ['userid1', 'userid2', 'useridn']
  },
  deny: { // probably want to use either allow or deny, but not both
    issuers: ['https://forge.anvil.io'],
    audience: ['clientid1', 'clientid2'],
    subjects: ['userid1', 'userid2', 'useridn']
  },
  handleErrors: false, // defaults to true
  tokenProperty: 'token',
  claimsProperty: 'claims'
});
```

* `realm` – Value of "realm" parameter to use in WWW-Authenticate challenge header.
* `scopes` – Array of scope values required to access this resource.
* `allow` – Object with arrays of allowed issuers, audience and subjects.
* `deny` – Object with arrays of restricted issuers, audience and subjects.
* `handleErrors` – When set to false, error conditions will result in a call to `next()`, passing control to the application's error handling.
* `tokenProperty` – Name of property on `req` to assign decoded JWT object. The property will not be set unless defined.
* `claimsProperty` – name of property on `req` to assign verified JWT claims. Defaults to "claims".


## JWT token spec
The JWT needs to have custom claims called perms, like the following JWT payload.
```json
{
  "jti": "f6xorlAVRiDOFhpvuddku",
  "iss": "http://localhost:1337/oauth2",
  "iat": 1547104662,
  "exp": 1547105262,
  "scope": "openid",
  "aud": [
    "profile"
  ],
  "azp": "profile",
  "perms": [
    "arn:permission:f8c12c00-a420-48c3-8228-9c8a1df7d924:profile/read"
  ]
}
```
The perms custom claims is needed for the middleware to check access using node-arn.

## How to use
```javascript
const { authenticateMiddleware } = require('identity-rs');

router.route('/').get(
  authenticateMiddleware('client', 'read'),
  validate(validation.list),
  controller.list
);
```

## Running tests

### Nodejs

```bash
$ yarn test
```

## License

[MIT License](README.md) - [Suhendra Ahmad]

# koa-slp-validation
A lightweight REST API server for validating SLP token transactions on the Bitcoin Cash (BCH) network before sending them.

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)




## Requirements
* node __^10.15.1__
* npm __^6.7.0__

## Installation
This repository allows for running the node.js directly as a *development environment*, or compiled into a Docker container for a *production environment*.

### Development
The following commands install this app, as well as MongoDB. You'll also want to set environment variables listed in the [common.js](./config/env/common.js) to point the validator at the RPC port of your own BCH full node.

```bash
git clone https://github.com/christroutner/koa-slp-validation
cd koa-slp-validation
npm install
./install-mongo
npm start
```

### Production
This app can be compiled into a Docker container and controlled with Docker Compose.
- Follow the commands on [this page](https://troutsblog.com/research/dev-ops/overview) to install Docker and Docker compose.
- Customize the [start-production](./production/start-production) shell script to point at the RPC port of your own BCH full node.
- Customize the [docker-compose.yml](./docker-compose.yml) file if you want to change the default port of 5001.
- Build the container with `docker-compose build`
- Run the docker container with `docker-compose up -d`

## Structure
```
├── bin
│   └── server.js            # Bootstrapping and entry point
├── config                   # Server configuration settings
│   ├── env                  # Environment specific config
│   │   ├── common.js
│   │   ├── development.js
│   │   ├── production.js
│   │   └── test.js
│   ├── index.js             # Config entrypoint - exports config according to envionrment and commons
│   └── passport.js          # Passportjs config of strategies
|
├── production               # Dockerfile for build production container
|
├── src                      # Source code
│   ├── lib                  # Business logic libraries
│   ├── modules
│   │   ├── controller.js    # Module-specific controllers
│   │   └── router.js        # Router definitions for module
│   ├── models               # Mongoose models
│   └── middleware           # Custom middleware
│       └── validators       # Validation middleware
└── test                     # Unit tests
```

*Note:* This project was originally forked from [this koa boilerplate](https://github.com/christroutner/koa-api-boilerplate). It includes features, like user authentication, that are not actively used in the application of an SLP validation.

## Usage
* `npm start` Start server on live mode
* `npm run dev` Start server on dev mode with nodemon
* `npm run docs` Generate API documentation
* `npm test` Run mocha tests
* `docker-compose build` Build a 'production' Docker container
* `docker-compose up` Run the docker container

### Examples
Validate a very simple txid. This should return true:

`curl -X GET http://localhost:5001/slp/validate/0e2fc27ec0438cd7e1ac6d4b549e218e6663c75480248f5cc6361cb11c742d74`

Validate a very a more complex txid. This should return true:
`curl -X GET http://localhost:5001/slp/validate/5a731e06d7620ac1aa78c8e78d899351d98da9219e2618f1482d9ba2fb994097`

Validate a non-SLP transaction. This should return false:
`curl -X GET http://localhost:5001/slp/validate/5f09d317e24c5d376f737a2711f3bd1d381abdb41743fff3819b4f76382e1eac`

## Credit
This application is really just a light-weight REST API wrapper around this [stand-alone SLP validation library](https://github.com/simpleledger/slp-validate) written by the awesome [James Cramer](https://github.com/jcramer).

## License
MIT

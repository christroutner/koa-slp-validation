/*
  This file is used to store unsecure, application-specific data common to all
  environments.
*/

module.exports = {
  port: process.env.PORT || 5001,
  rpcUserName: process.env.RPC_USER_NAME ? process.env.RPC_USER_NAME : 'bitcoin',
  rpcPassword: process.env.RPC_PASSWORD ? process.env.RPC_PASSWORD : 'password',
  rpcUrl: process.env.RPC_URL ? process.env.RPC_URL : '0.0.0.0:8332'
}

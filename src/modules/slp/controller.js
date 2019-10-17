/*
  Based on this example:
  https://github.com/simpleledger/slp-validate/blob/master/examples/1-validate-tx-rpc-burn-valid-stop.ts
*/

const util = require('util')
util.inspect.defaultOptions = { depth: 1 }

const slpValidate = require('slp-validate')
const ValidatorType1 = slpValidate.ValidatorType1
// console.log(`ValidatorType1: ${util.inspect(ValidatorType1)}`)

// import { ValidatorType1 } from 'slp-validate'
// import { Big } from 'big.js'
const RpcClient = require('bitcoin-rpc-promise-retry')

const config = require('../../../config')

let _this

class SLP {
  constructor () {
    _this = this
    console.log('')

    // Instantiate the RPC connection to the full node.
    const connectionString = `http://${config.rpcUserName}:${config.rpcPassword}@${config.rpcUrl}`
    this.rpc = new RpcClient(connectionString)
  }

  // Validates an SLP token TXID.
  async validateTxid (ctx, next) {
    try {
      const txid = ctx.params.txid

      // Track time of execution.
      // console.time('SLP-VALIDATE-RPC')

      // Instantiate the validator.
      const slpValidator = new ValidatorType1({ getRawTransaction: async (txid) => await _this.rpc.getRawTransaction(txid) })

      // console.log('This may take a several seconds...')

      // false by default.
      let isValid = false

      try {
        // Validate the txid.
        isValid = await slpValidator.isValidSlpTxid({ txid })
      } catch (error) {
        console.log(error)
        isValid = false
      }

      // console.log('Final Result:', isValid)
      // console.log('WARNING: THIS VALIDATION METHOD COMES WITH NO BURN PROTECTION.')
      // console.timeEnd('SLP-VALIDATE-RPC')

      ctx.body = {
        isValid: isValid
      }
    } catch (err) {
      if (err === 404 || err.name === 'CastError') {
        ctx.throw(404)
      }

      ctx.throw(500)
    }

    if (next) {
      return next()
    }
  }
}

module.exports = SLP

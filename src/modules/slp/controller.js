/*
  Based on this example:
  https://github.com/simpleledger/slp-validate/blob/master/examples/1-validate-tx-rpc-burn-valid-stop.ts
*/

const util = require('util')
util.inspect.defaultOptions = { depth: 1 }

const slpValidate = require('slp-validate')
const ValidatorType1 = slpValidate.ValidatorType1
// console.log(`ValidatorType1: ${util.inspect(ValidatorType1)}`)

const Big = require('big.js')
// console.log(`big: ${util.inspect(Big)}`)

// import { ValidatorType1 } from 'slp-validate'
// import { Big } from 'big.js'
const RpcClient = require('bitcoin-rpc-promise-retry')

const config = require('../../../config')

// let _this

class SLP {
  constructor () {
    // _this = this
    console.log('')
  }

  // Validates an SLP token TXID.
  async validateTxid (ctx, next) {
    try {
      const txid = ctx.params.txid

      console.time('SLP-VALIDATE-RPC')
      const connectionString = `http://${config.rpcUserName}:${config.rpcPassword}@${config.rpcUrl}`
      const rpc = new RpcClient(connectionString)
      const slpValidator = new ValidatorType1({ getRawTransaction: async (txid) => rpc.getRawTransaction(txid) })
      console.log('This may take a several seconds...')
      let isValid
      try {
        isValid = await slpValidator.isValidSlpTxn({ txid, burnQuantity: Big(0) })
      } catch (error) {
        console.log(error)
        isValid = false
      }

      console.log('Final Result:', isValid)
      console.log('NOTE: THIS IS A VALID SLP TRANSACTION, BUT WE CALL IT INVALID SINCE IT WAS BURNING INPUTS.')
      console.timeEnd('SLP-VALIDATE-RPC')

      ctx.body = {
        isValid: false
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

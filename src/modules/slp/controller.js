
let _this

class SLP {
  constructor () {
    _this = this
  }

  // Validates an SLP token TXID.
  async validateTxid (ctx, next) {
    try {
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

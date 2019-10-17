/*
  Integration tests for the slp endpoint.
*/

'use strict'

const config = require('../../config')

const app = require('../../bin/server')
const rp = require('request-promise')
const assert = require('chai').assert
const testUtils = require('../unit/utils')

const LOCALHOST = `http://localhost:${config.port}`

let context = {}

describe('SLP', () => {
  before(async () => {
    await app.startServer() // This should be second instruction.
  })

  describe('GET /validate/:txid', () => {
    it('should validate a SLP genesis txid', async () => {
      // const txid = `5a731e06d7620ac1aa78c8e78d899351d98da9219e2618f1482d9ba2fb994097`
      const txid = `0e2fc27ec0438cd7e1ac6d4b549e218e6663c75480248f5cc6361cb11c742d74`

      const options = {
        method: 'GET',
        uri: `${LOCALHOST}/slp/validate/${txid}`,
        resolveWithFullResponse: true,
        json: true,
        headers: {
          Accept: 'application/json'
        }
      }

      const result = await rp(options)
      const body = result.body
      // console.log(`body: ${JSON.stringify(body, null, 2)}`)

      assert.equal(body.isValid, true)
    })
  })
})

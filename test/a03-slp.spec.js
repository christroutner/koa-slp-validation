/*
  Unit tests for SLP validation endpoints.
*/

'use strict'

const testUtils = require('./utils')
const rp = require('request-promise')
const assert = require('chai').assert
const config = require('../config')

const LOCALHOST = `http://localhost:${config.port}`

const SLP = require('../src/modules/slp/controller')
const slp = new SLP()

let context = {}

describe('SLP', () => {
  before(async () => {
    const testUser = await testUtils.loginTestUser()
    // console.log(`testUser: ${JSON.stringify(testUser, null, 2)}`)

    context.testUser = testUser
  })

  describe('GET /validate/:txid', () => {
    it('should validate', async () => {
      const txid = `5a731e06d7620ac1aa78c8e78d899351d98da9219e2618f1482d9ba2fb994097`

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
      console.log(`body: ${JSON.stringify(body, null, 2)}`)

      // const result = await slp.validateTxid(txid)
      // console.log(`result: ${JSON.stringify(result, null, 2)}`)
    })
  })
})

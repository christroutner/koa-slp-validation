/*
  Unit tests for SLP validation endpoints.
*/

'use strict'

const config = require('../../config')

const testUtils = require('./utils')
const rp = require('request-promise')
const assert = require('chai').assert
const sinon = require('sinon')

const LOCALHOST = `http://localhost:${config.port}`

const SLP = require('../../src/modules/slp/controller')
const slp = new SLP()

const mockData = require('./mocks/slp-mocks')

let context = {}

describe('SLP', () => {
  let sandbox

  before(async () => {
    const testUser = await testUtils.loginTestUser()
    // console.log(`testUser: ${JSON.stringify(testUser, null, 2)}`)

    context.testUser = testUser

    sandbox = sinon.createSandbox()
  })

  describe('GET /validate/:txid', () => {
    it('should validate a genesis txid', async () => {
      const mockTx = '0200000001ad831c1d04db55320eed88f86cefe11d232e0562899dcb07f4058b94ecba0cfc000000006a473044022039e13a6aa2ea1563d204b4e2f757983c4c29c7bfb7b2a3c5934db4ca8e3c9c2c02202135885fb91ef1dc9e1e4323a3c8d3d514c58631328197eaa36d5c28430103b64121038c295f820a24bd42bb25af93583e6d58bcbc46a3c7db8635ecfe4a6ced334224ffffffff040000000000000000596a04534c500001010747454e4553495306534c5053444b1c534c502053444b206578616d706c65207573696e6720424954424f5815646576656c6f7065722e626974636f696e2e636f6d4c0001080102080000000bcdf49b0022020000000000001976a914653509aac57b54d4ecc1e5ae14d8a0522d7611a688ac22020000000000001976a914653509aac57b54d4ecc1e5ae14d8a0522d7611a688acdd0d0000000000001976a914653509aac57b54d4ecc1e5ae14d8a0522d7611a688ac00000000'

      // Mock the actual network call.
      sandbox.stub(slp.rpc, 'getRawTransaction').resolves(mockTx)

      // const txid = `5a731e06d7620ac1aa78c8e78d899351d98da9219e2618f1482d9ba2fb994097`
      const txid = `0e2fc27ec0438cd7e1ac6d4b549e218e6663c75480248f5cc6361cb11c742d74`

      const ctx = Object.assign({}, mockData.ctxMock)
      ctx.params = {}
      ctx.params.txid = txid

      await slp.validateTxid(ctx)
      console.log(`ctx: ${JSON.stringify(ctx, null, 2)}`)

      assert.equal(ctx.body.isValid, true)

      // const options = {
      //   method: 'GET',
      //   uri: `${LOCALHOST}/slp/validate/${txid}`,
      //   resolveWithFullResponse: true,
      //   json: true,
      //   headers: {
      //     Accept: 'application/json'
      //   }
      // }
      //
      // const result = await rp(options)
      // const body = result.body
      // console.log(`body: ${JSON.stringify(body, null, 2)}`)

      // assert.equal(body.isValid, true)
    })
  })
})

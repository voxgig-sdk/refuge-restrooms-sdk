
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { RefugeRestroomsSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await RefugeRestroomsSDK.test()
    equal(null !== testsdk, true)
  })

})

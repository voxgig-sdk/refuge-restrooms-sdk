
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { RefugeRestroomsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = RefugeRestroomsSDK.test()
    equal(testsdk instanceof RefugeRestroomsSDK, true,
      'RefugeRestroomsSDK.test() must return a client synchronously')
  })

})

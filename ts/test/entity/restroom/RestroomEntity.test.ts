

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { RefugeRestroomsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('RestroomEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when REFUGE_RESTROOMS_TEST_LIVE=TRUE.
  afterEach(liveDelay('REFUGE_RESTROOMS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RefugeRestroomsSDK.test()
    const ent = testsdk.Restroom()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.REFUGE_RESTROOMS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'restroom.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"accessible","req":false,"short":"Whether the restroom is ADA accessible","type":"`$BOOLEAN`","index$":0},{"active":true,"name":"changing_table","req":false,"short":"Whether a changing table is available","type":"`$BOOLEAN`","index$":1},{"active":true,"name":"city","req":false,"short":"City name","type":"`$STRING`","index$":2},{"active":true,"name":"comment","req":false,"short":"Additional comments or notes","type":"`$STRING`","index$":3},{"active":true,"name":"country","req":false,"short":"Country code","type":"`$STRING`","index$":4},{"active":true,"format":"date-time","name":"created_at","req":false,"short":"Timestamp when the restroom was added","type":"`$STRING`","index$":5},{"active":true,"name":"directions","req":false,"short":"Directions to find the restroom","type":"`$STRING`","index$":6},{"active":true,"format":"double","name":"distance","req":false,"short":"Distance from search location in miles","type":"`$NUMBER`","index$":7},{"active":true,"name":"downvote","req":false,"short":"Number of downvotes","type":"`$INTEGER`","index$":8},{"active":true,"name":"id","req":false,"short":"Unique identifier for the restroom","type":"`$INTEGER`","index$":9},{"active":true,"format":"double","name":"latitude","req":false,"short":"Latitude coordinate","type":"`$NUMBER`","index$":10},{"active":true,"format":"double","name":"longitude","req":false,"short":"Longitude coordinate","type":"`$NUMBER`","index$":11},{"active":true,"name":"name","req":false,"short":"Name of the location or establishment","type":"`$STRING`","index$":12},{"active":true,"name":"state","req":false,"short":"State or province","type":"`$STRING`","index$":13},{"active":true,"name":"street","req":false,"short":"Street address","type":"`$STRING`","index$":14},{"active":true,"name":"unisex","req":false,"short":"Whether the restroom is unisex/gender-neutral","type":"`$BOOLEAN`","index$":15},{"active":true,"format":"date-time","name":"updated_at","req":false,"short":"Timestamp when the restroom was last updated","type":"`$STRING`","index$":16},{"active":true,"name":"upvote","req":false,"short":"Number of upvotes","type":"`$INTEGER`","index$":17}],"id":{"field":"id","name":"id"},"name":"restroom","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"ada","orig":"ada","reqd":false,"type":"`$BOOLEAN`","index$":0},{"active":true,"example":40.7128,"kind":"query","name":"lat","orig":"lat","reqd":false,"type":"`$NUMBER`","index$":1},{"active":true,"example":-74.006,"kind":"query","name":"lng","orig":"lng","reqd":false,"type":"`$NUMBER`","index$":2},{"active":true,"example":1,"kind":"query","name":"page","orig":"page","reqd":false,"type":"`$INTEGER`","index$":3},{"active":true,"example":10,"kind":"query","name":"per_page","orig":"per_page","reqd":false,"type":"`$INTEGER`","index$":4},{"active":true,"kind":"query","name":"unisex","orig":"unisex","reqd":false,"type":"`$BOOLEAN`","index$":5}]},"contract":{"id":"GET /v1/restrooms","json":"{\"operationId\":\"searchRestrooms\",\"parameters\":[{\"description\":\"Latitude coordinate for location-based search\",\"in\":\"query\",\"name\":\"lat\",\"required\":false,\"schema\":{\"example\":40.7128,\"format\":\"double\",\"type\":\"number\"}},{\"description\":\"Longitude coordinate for location-based search\",\"in\":\"query\",\"name\":\"lng\",\"required\":false,\"schema\":{\"example\":-74.006,\"format\":\"double\",\"type\":\"number\"}},{\"description\":\"Filter for ADA accessible restrooms only\",\"in\":\"query\",\"name\":\"ada\",\"required\":false,\"schema\":{\"type\":\"boolean\"}},{\"description\":\"Filter for unisex restrooms only\",\"in\":\"query\",\"name\":\"unisex\",\"required\":false,\"schema\":{\"type\":\"boolean\"}},{\"description\":\"Page number for pagination\",\"in\":\"query\",\"name\":\"page\",\"required\":false,\"schema\":{\"default\":1,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of results per page\",\"in\":\"query\",\"name\":\"per_page\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":[{\"accessible\":true,\"changing_table\":true,\"city\":\"New York\",\"comment\":\"Clean and well-maintained\",\"country\":\"US\",\"created_at\":\"2023-01-15T10:30:00Z\",\"directions\":\"On the first floor near the entrance\",\"distance\":0.5,\"downvote\":0,\"id\":1234,\"latitude\":40.7128,\"longitude\":-74.006,\"name\":\"Public Library Downtown\",\"state\":\"NY\",\"street\":\"123 Main Street\",\"unisex\":true,\"updated_at\":\"2023-06-20T14:45:00Z\",\"upvote\":15}],\"schema\":{\"items\":{\"properties\":{\"accessible\":{\"description\":\"Whether the restroom is ADA accessible\",\"type\":\"boolean\"},\"changing_table\":{\"description\":\"Whether a changing table is available\",\"type\":\"boolean\"},\"city\":{\"description\":\"City name\",\"type\":\"string\"},\"comment\":{\"description\":\"Additional comments or notes\",\"nullable\":true,\"type\":\"string\"},\"country\":{\"description\":\"Country code\",\"type\":\"string\"},\"created_at\":{\"description\":\"Timestamp when the restroom was added\",\"format\":\"date-time\",\"type\":\"string\"},\"directions\":{\"description\":\"Directions to find the restroom\",\"nullable\":true,\"type\":\"string\"},\"distance\":{\"description\":\"Distance from search location in miles\",\"format\":\"double\",\"nullable\":true,\"type\":\"number\"},\"downvote\":{\"description\":\"Number of downvotes\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the restroom\",\"type\":\"integer\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"name\":{\"description\":\"Name of the location or establishment\",\"type\":\"string\"},\"state\":{\"description\":\"State or province\",\"type\":\"string\"},\"street\":{\"description\":\"Street address\",\"type\":\"string\"},\"unisex\":{\"description\":\"Whether the restroom is unisex/gender-neutral\",\"type\":\"boolean\"},\"updated_at\":{\"description\":\"Timestamp when the restroom was last updated\",\"format\":\"date-time\",\"type\":\"string\"},\"upvote\":{\"description\":\"Number of upvotes\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of restrooms\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error description\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/restrooms","segments":[{"lit":"v1"},{"lit":"restrooms"}],"select":{"exist":["ada","lat","lng","page","per_page","unisex"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"lat","orig":"lat","reqd":true,"type":"`$NUMBER`"},{"active":true,"kind":"query","name":"lng","orig":"lng","reqd":true,"type":"`$NUMBER`"}]},"contract":{"id":"GET /v1/restrooms/by_location","json":"{\"operationId\":\"getRestroomsByLocation\",\"parameters\":[{\"description\":\"Latitude coordinate\",\"in\":\"query\",\"name\":\"lat\",\"required\":true,\"schema\":{\"format\":\"double\",\"type\":\"number\"}},{\"description\":\"Longitude coordinate\",\"in\":\"query\",\"name\":\"lng\",\"required\":true,\"schema\":{\"format\":\"double\",\"type\":\"number\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"accessible\":{\"description\":\"Whether the restroom is ADA accessible\",\"type\":\"boolean\"},\"changing_table\":{\"description\":\"Whether a changing table is available\",\"type\":\"boolean\"},\"city\":{\"description\":\"City name\",\"type\":\"string\"},\"comment\":{\"description\":\"Additional comments or notes\",\"nullable\":true,\"type\":\"string\"},\"country\":{\"description\":\"Country code\",\"type\":\"string\"},\"created_at\":{\"description\":\"Timestamp when the restroom was added\",\"format\":\"date-time\",\"type\":\"string\"},\"directions\":{\"description\":\"Directions to find the restroom\",\"nullable\":true,\"type\":\"string\"},\"distance\":{\"description\":\"Distance from search location in miles\",\"format\":\"double\",\"nullable\":true,\"type\":\"number\"},\"downvote\":{\"description\":\"Number of downvotes\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the restroom\",\"type\":\"integer\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"name\":{\"description\":\"Name of the location or establishment\",\"type\":\"string\"},\"state\":{\"description\":\"State or province\",\"type\":\"string\"},\"street\":{\"description\":\"Street address\",\"type\":\"string\"},\"unisex\":{\"description\":\"Whether the restroom is unisex/gender-neutral\",\"type\":\"boolean\"},\"updated_at\":{\"description\":\"Timestamp when the restroom was last updated\",\"format\":\"date-time\",\"type\":\"string\"},\"upvote\":{\"description\":\"Number of upvotes\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"List of nearby restrooms\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/restrooms/by_location","segments":[{"lit":"v1"},{"lit":"restrooms"},{"lit":"by_location"}],"select":{"$action":"by_location","exist":["lat","lng"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{"query":[{"active":true,"example":"New York, NY","kind":"query","name":"query","orig":"query","reqd":true,"type":"`$STRING`"}]},"contract":{"id":"GET /v1/restrooms/search","json":"{\"operationId\":\"searchRestroomsByAddress\",\"parameters\":[{\"description\":\"Address or location query string\",\"in\":\"query\",\"name\":\"query\",\"required\":true,\"schema\":{\"example\":\"New York, NY\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"accessible\":{\"description\":\"Whether the restroom is ADA accessible\",\"type\":\"boolean\"},\"changing_table\":{\"description\":\"Whether a changing table is available\",\"type\":\"boolean\"},\"city\":{\"description\":\"City name\",\"type\":\"string\"},\"comment\":{\"description\":\"Additional comments or notes\",\"nullable\":true,\"type\":\"string\"},\"country\":{\"description\":\"Country code\",\"type\":\"string\"},\"created_at\":{\"description\":\"Timestamp when the restroom was added\",\"format\":\"date-time\",\"type\":\"string\"},\"directions\":{\"description\":\"Directions to find the restroom\",\"nullable\":true,\"type\":\"string\"},\"distance\":{\"description\":\"Distance from search location in miles\",\"format\":\"double\",\"nullable\":true,\"type\":\"number\"},\"downvote\":{\"description\":\"Number of downvotes\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the restroom\",\"type\":\"integer\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"name\":{\"description\":\"Name of the location or establishment\",\"type\":\"string\"},\"state\":{\"description\":\"State or province\",\"type\":\"string\"},\"street\":{\"description\":\"Street address\",\"type\":\"string\"},\"unisex\":{\"description\":\"Whether the restroom is unisex/gender-neutral\",\"type\":\"boolean\"},\"updated_at\":{\"description\":\"Timestamp when the restroom was last updated\",\"format\":\"date-time\",\"type\":\"string\"},\"upvote\":{\"description\":\"Number of upvotes\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"List of restrooms matching the search\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/restrooms/search","segments":[{"lit":"v1"},{"lit":"restrooms"},{"lit":"search"}],"select":{"$action":"search","exist":["query"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"restroom","name__orig":"restroom","Name":"Restroom","name_":"restroom","name-":"restroom","NAME":"RESTROOM","index$":0}, {"active":true,"entity":"restroom","key$":"BasicRestroomFlow","kind":"basic","name":"BasicRestroomFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"restroom_ref01"}}],"index$":0}]}, 'Restroom')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let restroom_ref01_data = Object.values(setup.data.existing.restroom)[0] as any

    // LIST
    const restroom_ref01_ent = client.Restroom()
    const restroom_ref01_match: any = {}

    const restroom_ref01_list = (await restroom_ref01_ent.list(restroom_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/restroom/RestroomTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = RefugeRestroomsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['restroom01','restroom02','restroom03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'REFUGE_RESTROOMS_TEST_RESTROOM_ENTID': idmap,
    'REFUGE_RESTROOMS_TEST_LIVE': 'FALSE',
    'REFUGE_RESTROOMS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['REFUGE_RESTROOMS_TEST_RESTROOM_ENTID']

  const live = 'TRUE' === env.REFUGE_RESTROOMS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['REFUGE_RESTROOMS_TEST_RESTROOM_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new RefugeRestroomsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.REFUGE_RESTROOMS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  



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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"accessible":{"a":true,"h":"Accessible","n":"accessible","r":false,"sh":"Whether the restroom is ADA accessible","t":"`$BOOLEAN`","key$":"accessible","index$":0},"changing_table":{"a":true,"h":"Changing Table","n":"changing_table","r":false,"sh":"Whether a changing table is available","t":"`$BOOLEAN`","key$":"changing_table","index$":1},"city":{"a":true,"h":"City","n":"city","r":false,"sh":"City name","t":"`$STRING`","key$":"city","index$":2},"comment":{"a":true,"h":"Comment","n":"comment","r":false,"sh":"Additional comments or notes","t":"`$STRING`","key$":"comment","index$":3},"country":{"a":true,"h":"Country","n":"country","r":false,"sh":"Country code","t":"`$STRING`","key$":"country","index$":4},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Timestamp when the restroom was added","t":"`$STRING`","key$":"created_at","index$":5},"directions":{"a":true,"h":"Directions","n":"directions","r":false,"sh":"Directions to find the restroom","t":"`$STRING`","key$":"directions","index$":6},"distance":{"a":true,"fo":"double","h":"Distance","n":"distance","r":false,"sh":"Distance from search location in miles","t":"`$NUMBER`","key$":"distance","index$":7},"downvote":{"a":true,"h":"Downvote","n":"downvote","r":false,"sh":"Number of downvotes","t":"`$INTEGER`","key$":"downvote","index$":8},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the restroom","t":"`$INTEGER`","key$":"id","index$":9},"latitude":{"a":true,"fo":"double","h":"Latitude","n":"latitude","r":false,"sh":"Latitude coordinate","t":"`$NUMBER`","key$":"latitude","index$":10},"longitude":{"a":true,"fo":"double","h":"Longitude","n":"longitude","r":false,"sh":"Longitude coordinate","t":"`$NUMBER`","key$":"longitude","index$":11},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the location or establishment","t":"`$STRING`","key$":"name","index$":12},"state":{"a":true,"h":"State","n":"state","r":false,"sh":"State or province","t":"`$STRING`","key$":"state","index$":13},"street":{"a":true,"h":"Street","n":"street","r":false,"sh":"Street address","t":"`$STRING`","key$":"street","index$":14},"unisex":{"a":true,"h":"Unisex","n":"unisex","r":false,"sh":"Whether the restroom is unisex/gender-neutral","t":"`$BOOLEAN`","key$":"unisex","index$":15},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":false,"sh":"Timestamp when the restroom was last updated","t":"`$STRING`","key$":"updated_at","index$":16},"upvote":{"a":true,"h":"Upvote","n":"upvote","r":false,"sh":"Number of upvotes","t":"`$INTEGER`","key$":"upvote","index$":17}},"id":{"field":"id","name":"id"},"name":"restroom","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/restrooms","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"ada","or":"ada","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":40.7128,"k":"query","n":"lat","or":"lat","r":false,"t":"`$NUMBER`","index$":1},{"a":true,"ex":-74.006,"k":"query","n":"lng","or":"lng","r":false,"t":"`$NUMBER`","index$":2},{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"ex":10,"k":"query","n":"per_page","or":"per_page","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"k":"query","n":"unisex","or":"unisex","r":false,"t":"`$BOOLEAN`","index$":5}]},"k":"http","m":"GET","o":"/v1/restrooms","q":{"exist":["ada","lat","lng","page","per_page","unisex"]},"r":{},"s":[{"lit":"v1"},{"lit":"restrooms"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /v1/restrooms/by_location","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"lat","or":"lat","r":true,"t":"`$NUMBER`","index$":0},{"a":true,"k":"query","n":"lng","or":"lng","r":true,"t":"`$NUMBER`","index$":1}]},"k":"http","m":"GET","o":"/v1/restrooms/by_location","q":{"$action":"by_location","exist":["lat","lng"]},"r":{},"s":[{"lit":"v1"},{"lit":"restrooms"},{"lit":"by_location"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /v1/restrooms/search","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"New York, NY","k":"query","n":"query","or":"query","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/restrooms/search","q":{"$action":"search","exist":["query"]},"r":{},"s":[{"lit":"v1"},{"lit":"restrooms"},{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"restroom","name__orig":"restroom","Name":"Restroom","name_":"restroom","name-":"restroom","NAME":"RESTROOM","index$":0}, {"active":true,"entity":"restroom","key$":"BasicRestroomFlow","kind":"basic","name":"BasicRestroomFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"restroom_ref01"}}],"index$":0}]}, 'Restroom', {"GET /v1/restrooms":{"protocol":"http","parameters":[{"name":"lat","in":"query","description":"Latitude coordinate for location-based search","required":false,"schema":{"type":"number","format":"double","example":40.7128},"index$":0},{"name":"lng","in":"query","description":"Longitude coordinate for location-based search","required":false,"schema":{"type":"number","format":"double","example":-74.006},"index$":1},{"name":"ada","in":"query","description":"Filter for ADA accessible restrooms only","required":false,"schema":{"type":"boolean"},"index$":2},{"name":"unisex","in":"query","description":"Filter for unisex restrooms only","required":false,"schema":{"type":"boolean"},"index$":3},{"name":"page","in":"query","description":"Page number for pagination","required":false,"schema":{"type":"integer","default":1,"minimum":1},"index$":4},{"name":"per_page","in":"query","description":"Number of results per page","required":false,"schema":{"type":"integer","default":10,"minimum":1,"maximum":100},"index$":5}]},"GET /v1/restrooms/by_location":{"protocol":"http","parameters":[{"name":"lat","in":"query","description":"Latitude coordinate","required":true,"schema":{"type":"number","format":"double"},"index$":0},{"name":"lng","in":"query","description":"Longitude coordinate","required":true,"schema":{"type":"number","format":"double"},"index$":1}]},"GET /v1/restrooms/search":{"protocol":"http","parameters":[{"name":"query","in":"query","description":"Address or location query string","required":true,"schema":{"type":"string","example":"New York, NY"},"index$":0}]}})
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
  

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('RestroomEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when REFUGE_RESTROOMS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('REFUGE_RESTROOMS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.RefugeRestroomsSDK.test();
        const ent = testsdk.Restroom();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('restroom hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.RefugeRestroomsSDK.test(offline).Restroom().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.RefugeRestroomsSDK.test(offline).Restroom()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.RefugeRestroomsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Restroom().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.RefugeRestroomsSDK.test().Restroom().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.RefugeRestroomsSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Restroom().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Restroom().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.RefugeRestroomsSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Restroom().list({ "ada": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.REFUGE_RESTROOMS_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'restroom.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "accessible": { "a": true, "h": "Accessible", "n": "accessible", "r": false, "sh": "Whether the restroom is ADA accessible", "t": "`$BOOLEAN`", "key$": "accessible", "index$": 0 }, "changing_table": { "a": true, "h": "Changing Table", "n": "changing_table", "r": false, "sh": "Whether a changing table is available", "t": "`$BOOLEAN`", "key$": "changing_table", "index$": 1 }, "city": { "a": true, "h": "City", "n": "city", "r": false, "sh": "City name", "t": "`$STRING`", "key$": "city", "index$": 2 }, "comment": { "a": true, "h": "Comment", "n": "comment", "r": false, "sh": "Additional comments or notes", "t": "`$STRING`", "key$": "comment", "index$": 3 }, "country": { "a": true, "h": "Country", "n": "country", "r": false, "sh": "Country code", "t": "`$STRING`", "key$": "country", "index$": 4 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "Timestamp when the restroom was added", "t": "`$STRING`", "key$": "created_at", "index$": 5 }, "directions": { "a": true, "h": "Directions", "n": "directions", "r": false, "sh": "Directions to find the restroom", "t": "`$STRING`", "key$": "directions", "index$": 6 }, "distance": { "a": true, "fo": "double", "h": "Distance", "n": "distance", "r": false, "sh": "Distance from search location in miles", "t": "`$NUMBER`", "key$": "distance", "index$": 7 }, "downvote": { "a": true, "h": "Downvote", "n": "downvote", "r": false, "sh": "Number of downvotes", "t": "`$INTEGER`", "key$": "downvote", "index$": 8 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier for the restroom", "t": "`$INTEGER`", "key$": "id", "index$": 9 }, "latitude": { "a": true, "fo": "double", "h": "Latitude", "n": "latitude", "r": false, "sh": "Latitude coordinate", "t": "`$NUMBER`", "key$": "latitude", "index$": 10 }, "longitude": { "a": true, "fo": "double", "h": "Longitude", "n": "longitude", "r": false, "sh": "Longitude coordinate", "t": "`$NUMBER`", "key$": "longitude", "index$": 11 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Name of the location or establishment", "t": "`$STRING`", "key$": "name", "index$": 12 }, "state": { "a": true, "h": "State", "n": "state", "r": false, "sh": "State or province", "t": "`$STRING`", "key$": "state", "index$": 13 }, "street": { "a": true, "h": "Street", "n": "street", "r": false, "sh": "Street address", "t": "`$STRING`", "key$": "street", "index$": 14 }, "unisex": { "a": true, "h": "Unisex", "n": "unisex", "r": false, "sh": "Whether the restroom is unisex/gender-neutral", "t": "`$BOOLEAN`", "key$": "unisex", "index$": 15 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": false, "sh": "Timestamp when the restroom was last updated", "t": "`$STRING`", "key$": "updated_at", "index$": 16 }, "upvote": { "a": true, "h": "Upvote", "n": "upvote", "r": false, "sh": "Number of upvotes", "t": "`$INTEGER`", "key$": "upvote", "index$": 17 } }, "id": { "field": "id", "name": "id" }, "name": "restroom", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/restrooms/by_location", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "lat", "or": "lat", "r": true, "t": "`$NUMBER`", "index$": 0 }, { "a": true, "k": "query", "n": "lng", "or": "lng", "r": true, "t": "`$NUMBER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v1/restrooms/by_location", "q": { "$action": "by_location", "exist": ["lat", "lng"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "restrooms" }, { "lit": "by_location" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v1/restrooms/search", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "New York, NY", "k": "query", "n": "query", "or": "query", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/restrooms/search", "q": { "$action": "search", "exist": ["query"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "restrooms" }, { "lit": "search" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /v1/restrooms", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "ada", "or": "ada", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "ex": 40.7128, "k": "query", "n": "lat", "or": "lat", "r": false, "t": "`$NUMBER`", "index$": 1 }, { "a": true, "ex": -74.006, "k": "query", "n": "lng", "or": "lng", "r": false, "t": "`$NUMBER`", "index$": 2 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "ex": 10, "k": "query", "n": "per_page", "or": "per_page", "r": false, "t": "`$INTEGER`", "index$": 4 }, { "a": true, "k": "query", "n": "unisex", "or": "unisex", "r": false, "t": "`$BOOLEAN`", "index$": 5 }] }, "k": "http", "m": "GET", "o": "/v1/restrooms", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "restrooms" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "restroom", "name__orig": "restroom", "Name": "Restroom", "name_": "restroom", "name-": "restroom", "NAME": "RESTROOM", "index$": 0 }, { "active": true, "entity": "restroom", "key$": "BasicRestroomFlow", "kind": "basic", "name": "BasicRestroomFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "restroom_ref01" } }], "index$": 0 }] }, 'Restroom', { "GET /v1/restrooms/by_location": { "protocol": "http", "parameters": [{ "name": "lat", "in": "query", "description": "Latitude coordinate", "required": true, "schema": { "type": "number", "format": "double" }, "index$": 0 }, { "name": "lng", "in": "query", "description": "Longitude coordinate", "required": true, "schema": { "type": "number", "format": "double" }, "index$": 1 }] }, "GET /v1/restrooms/search": { "protocol": "http", "parameters": [{ "name": "query", "in": "query", "description": "Address or location query string", "required": true, "schema": { "type": "string", "example": "New York, NY" }, "index$": 0 }] }, "GET /v1/restrooms": { "protocol": "http", "parameters": [{ "name": "lat", "in": "query", "description": "Latitude coordinate for location-based search", "required": false, "schema": { "type": "number", "format": "double", "example": 40.7128 }, "index$": 0 }, { "name": "lng", "in": "query", "description": "Longitude coordinate for location-based search", "required": false, "schema": { "type": "number", "format": "double", "example": -74.006 }, "index$": 1 }, { "name": "ada", "in": "query", "description": "Filter for ADA accessible restrooms only", "required": false, "schema": { "type": "boolean" }, "index$": 2 }, { "name": "unisex", "in": "query", "description": "Filter for unisex restrooms only", "required": false, "schema": { "type": "boolean" }, "index$": 3 }, { "name": "page", "in": "query", "description": "Page number for pagination", "required": false, "schema": { "type": "integer", "default": 1, "minimum": 1 }, "index$": 4 }, { "name": "per_page", "in": "query", "description": "Number of results per page", "required": false, "schema": { "type": "integer", "default": 10, "minimum": 1, "maximum": 100 }, "index$": 5 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let restroom_ref01_data = Object.values(setup.data.existing.restroom)[0];
        // LIST
        const restroom_ref01_ent = client.Restroom();
        const restroom_ref01_match = {};
        const restroom_ref01_list = (await restroom_ref01_ent.list(restroom_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/restroom/RestroomTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.RefugeRestroomsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['restroom01', 'restroom02', 'restroom03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'REFUGE_RESTROOMS_TEST_RESTROOM_ENTID': idmap,
        'REFUGE_RESTROOMS_TEST_LIVE': 'FALSE',
        'REFUGE_RESTROOMS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['REFUGE_RESTROOMS_TEST_RESTROOM_ENTID'];
    const live = 'TRUE' === env.REFUGE_RESTROOMS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['REFUGE_RESTROOMS_TEST_RESTROOM_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.RefugeRestroomsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=RestroomEntity.test.js.map
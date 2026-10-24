"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "restroom",
        "accessor": "Restroom",
        "op": "list",
        "method": "GET",
        "path": "/v1/restrooms/by_location",
        "action": "by_location",
        "args": [],
        "select": {
            "lat": "v1",
            "lng": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "lat",
            "lng"
        ],
        "queryArgs": [
            {
                "name": "lat",
                "wire": "lat"
            },
            {
                "name": "lng",
                "wire": "lng"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "name": "x",
                "street": "x",
                "city": "x",
                "state": "x",
                "country": "x",
                "accessible": true,
                "unisex": true,
                "changing_table": true,
                "directions": "x",
                "comment": "x",
                "latitude": 1,
                "longitude": 1,
                "created_at": "2026-01-01T00:00:00Z",
                "updated_at": "2026-01-01T00:00:00Z",
                "downvote": 1,
                "upvote": 1,
                "distance": 1
            }
        ],
        "idField": "id"
    },
    {
        "entity": "restroom",
        "accessor": "Restroom",
        "op": "list",
        "method": "GET",
        "path": "/v1/restrooms/search",
        "action": "search",
        "args": [],
        "select": {
            "query": "New York, NY"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "query"
        ],
        "queryArgs": [
            {
                "name": "query",
                "wire": "query"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "name": "x",
                "street": "x",
                "city": "x",
                "state": "x",
                "country": "x",
                "accessible": true,
                "unisex": true,
                "changing_table": true,
                "directions": "x",
                "comment": "x",
                "latitude": 1,
                "longitude": 1,
                "created_at": "2026-01-01T00:00:00Z",
                "updated_at": "2026-01-01T00:00:00Z",
                "downvote": 1,
                "upvote": 1,
                "distance": 1
            }
        ],
        "idField": "id"
    },
    {
        "entity": "restroom",
        "accessor": "Restroom",
        "op": "list",
        "method": "GET",
        "path": "/v1/restrooms",
        "args": [],
        "select": {
            "ada": "v1",
            "page": 1,
            "per_page": 10,
            "unisex": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "lat",
            "lng",
            "ada",
            "unisex",
            "page",
            "per_page"
        ],
        "queryArgs": [
            {
                "name": "ada",
                "wire": "ada"
            },
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "per_page",
                "wire": "per_page"
            },
            {
                "name": "unisex",
                "wire": "unisex"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1234,
                "name": "Public Library Downtown",
                "street": "123 Main Street",
                "city": "New York",
                "state": "NY",
                "country": "US",
                "accessible": true,
                "unisex": true,
                "changing_table": true,
                "directions": "On the first floor near the entrance",
                "comment": "Clean and well-maintained",
                "latitude": 40.7128,
                "longitude": -74.006,
                "created_at": "2023-01-15T10:30:00Z",
                "updated_at": "2023-06-20T14:45:00Z",
                "downvote": 0,
                "upvote": 15,
                "distance": 0.5
            }
        ],
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map
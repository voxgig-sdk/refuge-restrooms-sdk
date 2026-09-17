
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'RefugeRestrooms',
        slug: "refuge-restrooms",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://www.refugerestrooms.org/api",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        restroom: {
        },
  
    }
  }


  entity = {
    "restroom": {
      "fields": [
        {
          "name": "accessible",
          "short": "Whether the restroom is ADA accessible",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "changing_table",
          "short": "Whether a changing table is available",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "city",
          "short": "City name",
          "type": "`$STRING`"
        },
        {
          "name": "comment",
          "short": "Additional comments or notes",
          "type": "`$STRING`"
        },
        {
          "name": "country",
          "short": "Country code",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "created_at",
          "short": "Timestamp when the restroom was added",
          "type": "`$STRING`"
        },
        {
          "name": "directions",
          "short": "Directions to find the restroom",
          "type": "`$STRING`"
        },
        {
          "format": "double",
          "name": "distance",
          "short": "Distance from search location in miles",
          "type": "`$NUMBER`"
        },
        {
          "name": "downvote",
          "short": "Number of downvotes",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the restroom",
          "type": "`$INTEGER`"
        },
        {
          "format": "double",
          "name": "latitude",
          "short": "Latitude coordinate",
          "type": "`$NUMBER`"
        },
        {
          "format": "double",
          "name": "longitude",
          "short": "Longitude coordinate",
          "type": "`$NUMBER`"
        },
        {
          "name": "name",
          "short": "Name of the location or establishment",
          "type": "`$STRING`"
        },
        {
          "name": "state",
          "short": "State or province",
          "type": "`$STRING`"
        },
        {
          "name": "street",
          "short": "Street address",
          "type": "`$STRING`"
        },
        {
          "name": "unisex",
          "short": "Whether the restroom is unisex/gender-neutral",
          "type": "`$BOOLEAN`"
        },
        {
          "format": "date-time",
          "name": "updated_at",
          "short": "Timestamp when the restroom was last updated",
          "type": "`$STRING`"
        },
        {
          "name": "upvote",
          "short": "Number of upvotes",
          "type": "`$INTEGER`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "restroom",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "ada",
                    "orig": "ada",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": 40.7128,
                    "kind": "query",
                    "name": "lat",
                    "orig": "lat",
                    "type": "`$NUMBER`"
                  },
                  {
                    "example": -74.006,
                    "kind": "query",
                    "name": "lng",
                    "orig": "lng",
                    "type": "`$NUMBER`"
                  },
                  {
                    "example": 1,
                    "kind": "query",
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 10,
                    "kind": "query",
                    "name": "per_page",
                    "orig": "per_page",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "unisex",
                    "orig": "unisex",
                    "type": "`$BOOLEAN`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/restrooms",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "restrooms"
                }
              ],
              "select": {
                "exist": [
                  "ada",
                  "lat",
                  "lng",
                  "page",
                  "per_page",
                  "unisex"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "v1",
                "restrooms"
              ]
            },
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "lat",
                    "orig": "lat",
                    "reqd": true,
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "lng",
                    "orig": "lng",
                    "reqd": true,
                    "type": "`$NUMBER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/restrooms/by_location",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "restrooms"
                },
                {
                  "lit": "by_location"
                }
              ],
              "select": {
                "$action": "by_location",
                "exist": [
                  "lat",
                  "lng"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "v1",
                "restrooms",
                "by_location"
              ]
            },
            {
              "args": {
                "query": [
                  {
                    "example": "New York, NY",
                    "kind": "query",
                    "name": "query",
                    "orig": "query",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/restrooms/search",
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "restrooms"
                },
                {
                  "lit": "search"
                }
              ],
              "select": {
                "$action": "search",
                "exist": [
                  "query"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "v1",
                "restrooms",
                "search"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}


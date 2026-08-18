
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'RefugeRestrooms',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$BOOLEAN`"
        },
        {
          "name": "changing_table",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "city",
          "type": "`$STRING`"
        },
        {
          "name": "comment",
          "type": "`$STRING`"
        },
        {
          "name": "country",
          "type": "`$STRING`"
        },
        {
          "name": "created_at",
          "type": "`$STRING`"
        },
        {
          "name": "directions",
          "type": "`$STRING`"
        },
        {
          "name": "distance",
          "type": "`$NUMBER`"
        },
        {
          "name": "downvote",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "type": "`$INTEGER`"
        },
        {
          "name": "latitude",
          "type": "`$NUMBER`"
        },
        {
          "name": "longitude",
          "type": "`$NUMBER`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "state",
          "type": "`$STRING`"
        },
        {
          "name": "street",
          "type": "`$STRING`"
        },
        {
          "name": "unisex",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "updated_at",
          "type": "`$STRING`"
        },
        {
          "name": "upvote",
          "type": "`$INTEGER`"
        }
      ],
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
              "parts": [
                "v1",
                "restrooms"
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
              }
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
              "parts": [
                "v1",
                "restrooms",
                "by_location"
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
              }
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
              "parts": [
                "v1",
                "restrooms",
                "search"
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
              }
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
  config
}


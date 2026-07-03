# RefugeRestrooms SDK configuration

module RefugeRestroomsConfig
  def self.make_config
    {
      "main" => {
        "name" => "RefugeRestrooms",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://www.refugerestrooms.org/api",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "restroom" => {},
        },
      },
      "entity" => {
        "restroom" => {
          "fields" => [
            {
              "active" => true,
              "name" => "accessible",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "changing_table",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "city",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "comment",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "country",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "created_at",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 5,
            },
            {
              "active" => true,
              "name" => "direction",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 6,
            },
            {
              "active" => true,
              "name" => "distance",
              "req" => false,
              "type" => "`$NUMBER`",
              "index$" => 7,
            },
            {
              "active" => true,
              "name" => "downvote",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 8,
            },
            {
              "active" => true,
              "name" => "id",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 9,
            },
            {
              "active" => true,
              "name" => "latitude",
              "req" => false,
              "type" => "`$NUMBER`",
              "index$" => 10,
            },
            {
              "active" => true,
              "name" => "longitude",
              "req" => false,
              "type" => "`$NUMBER`",
              "index$" => 11,
            },
            {
              "active" => true,
              "name" => "name",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 12,
            },
            {
              "active" => true,
              "name" => "state",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 13,
            },
            {
              "active" => true,
              "name" => "street",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 14,
            },
            {
              "active" => true,
              "name" => "unisex",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "index$" => 15,
            },
            {
              "active" => true,
              "name" => "updated_at",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 16,
            },
            {
              "active" => true,
              "name" => "upvote",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 17,
            },
          ],
          "name" => "restroom",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "ada",
                        "orig" => "ada",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "active" => true,
                        "example" => 40.7128,
                        "kind" => "query",
                        "name" => "lat",
                        "orig" => "lat",
                        "reqd" => false,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "active" => true,
                        "example" => -74.006,
                        "kind" => "query",
                        "name" => "lng",
                        "orig" => "lng",
                        "reqd" => false,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "active" => true,
                        "example" => 1,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "example" => 10,
                        "kind" => "query",
                        "name" => "per_page",
                        "orig" => "per_page",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "unisex",
                        "orig" => "unisex",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/v1/restrooms",
                  "parts" => [
                    "v1",
                    "restrooms",
                  ],
                  "select" => {
                    "exist" => [
                      "ada",
                      "lat",
                      "lng",
                      "page",
                      "per_page",
                      "unisex",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "lat",
                        "orig" => "lat",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "lng",
                        "orig" => "lng",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/v1/restrooms/by_location",
                  "parts" => [
                    "v1",
                    "restrooms",
                    "by_location",
                  ],
                  "select" => {
                    "$action" => "by_location",
                    "exist" => [
                      "lat",
                      "lng",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 1,
                },
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "New York, NY",
                        "kind" => "query",
                        "name" => "query",
                        "orig" => "query",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/v1/restrooms/search",
                  "parts" => [
                    "v1",
                    "restrooms",
                    "search",
                  ],
                  "select" => {
                    "$action" => "search",
                    "exist" => [
                      "query",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 2,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    RefugeRestroomsFeatures.make_feature(name)
  end
end

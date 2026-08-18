# RefugeRestrooms SDK configuration

module RefugeRestroomsConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
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
              "name" => "accessible",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "changing_table",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "city",
              "type" => "`$STRING`",
            },
            {
              "name" => "comment",
              "type" => "`$STRING`",
            },
            {
              "name" => "country",
              "type" => "`$STRING`",
            },
            {
              "name" => "created_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "directions",
              "type" => "`$STRING`",
            },
            {
              "name" => "distance",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "downvote",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "latitude",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "longitude",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "state",
              "type" => "`$STRING`",
            },
            {
              "name" => "street",
              "type" => "`$STRING`",
            },
            {
              "name" => "unisex",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "updated_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "upvote",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "restroom",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "ada",
                        "orig" => "ada",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "example" => 40.7128,
                        "kind" => "query",
                        "name" => "lat",
                        "orig" => "lat",
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => -74.006,
                        "kind" => "query",
                        "name" => "lng",
                        "orig" => "lng",
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => 1,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "per_page",
                        "orig" => "per_page",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "unisex",
                        "orig" => "unisex",
                        "type" => "`$BOOLEAN`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "lat",
                        "orig" => "lat",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "lng",
                        "orig" => "lng",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "New York, NY",
                        "kind" => "query",
                        "name" => "query",
                        "orig" => "query",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
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

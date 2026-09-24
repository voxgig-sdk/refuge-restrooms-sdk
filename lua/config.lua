-- RefugeRestrooms SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "RefugeRestrooms",
      slug = "refuge-restrooms",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://www.refugerestrooms.org/api",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["restroom"] = {},
      },
    },
    entity = {
      ["restroom"] = {
        ["fields"] = {
          {
            ["name"] = "accessible",
            ["title"] = "Accessible",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Whether the restroom is ADA accessible",
          },
          {
            ["name"] = "changing_table",
            ["title"] = "Changing Table",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Whether a changing table is available",
          },
          {
            ["name"] = "city",
            ["title"] = "City",
            ["type"] = "`$STRING`",
            ["short"] = "City name",
          },
          {
            ["name"] = "comment",
            ["title"] = "Comment",
            ["type"] = "`$STRING`",
            ["short"] = "Additional comments or notes",
          },
          {
            ["name"] = "country",
            ["title"] = "Country",
            ["type"] = "`$STRING`",
            ["short"] = "Country code",
          },
          {
            ["name"] = "created_at",
            ["title"] = "Created At",
            ["type"] = "`$STRING`",
            ["short"] = "Timestamp when the restroom was added",
            ["format"] = "date-time",
          },
          {
            ["name"] = "directions",
            ["title"] = "Directions",
            ["type"] = "`$STRING`",
            ["short"] = "Directions to find the restroom",
          },
          {
            ["name"] = "distance",
            ["title"] = "Distance",
            ["type"] = "`$NUMBER`",
            ["short"] = "Distance from search location in miles",
            ["format"] = "double",
          },
          {
            ["name"] = "downvote",
            ["title"] = "Downvote",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of downvotes",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$INTEGER`",
            ["short"] = "Unique identifier for the restroom",
          },
          {
            ["name"] = "latitude",
            ["title"] = "Latitude",
            ["type"] = "`$NUMBER`",
            ["short"] = "Latitude coordinate",
            ["format"] = "double",
          },
          {
            ["name"] = "longitude",
            ["title"] = "Longitude",
            ["type"] = "`$NUMBER`",
            ["short"] = "Longitude coordinate",
            ["format"] = "double",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "Name of the location or establishment",
          },
          {
            ["name"] = "state",
            ["title"] = "State",
            ["type"] = "`$STRING`",
            ["short"] = "State or province",
          },
          {
            ["name"] = "street",
            ["title"] = "Street",
            ["type"] = "`$STRING`",
            ["short"] = "Street address",
          },
          {
            ["name"] = "unisex",
            ["title"] = "Unisex",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Whether the restroom is unisex/gender-neutral",
          },
          {
            ["name"] = "updated_at",
            ["title"] = "Updated At",
            ["type"] = "`$STRING`",
            ["short"] = "Timestamp when the restroom was last updated",
            ["format"] = "date-time",
          },
          {
            ["name"] = "upvote",
            ["title"] = "Upvote",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of upvotes",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "restroom",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/restrooms",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "restrooms",
                  },
                },
                ["parts"] = {
                  "v1",
                  "restrooms",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "ada",
                      ["orig"] = "ada",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "lat",
                      ["orig"] = "lat",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                      ["example"] = 40.7128,
                    },
                    {
                      ["name"] = "lng",
                      ["orig"] = "lng",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                      ["example"] = -74.006,
                    },
                    {
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1,
                    },
                    {
                      ["name"] = "per_page",
                      ["orig"] = "per_page",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 10,
                    },
                    {
                      ["name"] = "unisex",
                      ["orig"] = "unisex",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "ada",
                    "lat",
                    "lng",
                    "page",
                    "per_page",
                    "unisex",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/restrooms/by_location",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "restrooms",
                  },
                  {
                    ["lit"] = "by_location",
                  },
                },
                ["parts"] = {
                  "v1",
                  "restrooms",
                  "by_location",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "lat",
                      ["orig"] = "lat",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "lng",
                      ["orig"] = "lng",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "by_location",
                  ["exist"] = {
                    "lat",
                    "lng",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/restrooms/search",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "restrooms",
                  },
                  {
                    ["lit"] = "search",
                  },
                },
                ["parts"] = {
                  "v1",
                  "restrooms",
                  "search",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "query",
                      ["orig"] = "query",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                      ["example"] = "New York, NY",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "search",
                  ["exist"] = {
                    "query",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config

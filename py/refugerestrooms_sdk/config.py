# RefugeRestrooms SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "RefugeRestrooms",
            "slug": "refuge-restrooms",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://www.refugerestrooms.org/api",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "restroom": {},
            },
        },
        "entity": {
      "restroom": {
        "fields": [
          {
            "name": "accessible",
            "title": "Accessible",
            "type": "`$BOOLEAN`",
            "short": "Whether the restroom is ADA accessible",
          },
          {
            "name": "changing_table",
            "title": "Changing Table",
            "type": "`$BOOLEAN`",
            "short": "Whether a changing table is available",
          },
          {
            "name": "city",
            "title": "City",
            "type": "`$STRING`",
            "short": "City name",
          },
          {
            "name": "comment",
            "title": "Comment",
            "type": "`$STRING`",
            "short": "Additional comments or notes",
          },
          {
            "name": "country",
            "title": "Country",
            "type": "`$STRING`",
            "short": "Country code",
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "short": "Timestamp when the restroom was added",
            "format": "date-time",
          },
          {
            "name": "directions",
            "title": "Directions",
            "type": "`$STRING`",
            "short": "Directions to find the restroom",
          },
          {
            "name": "distance",
            "title": "Distance",
            "type": "`$NUMBER`",
            "short": "Distance from search location in miles",
            "format": "double",
          },
          {
            "name": "downvote",
            "title": "Downvote",
            "type": "`$INTEGER`",
            "short": "Number of downvotes",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "short": "Unique identifier for the restroom",
          },
          {
            "name": "latitude",
            "title": "Latitude",
            "type": "`$NUMBER`",
            "short": "Latitude coordinate",
            "format": "double",
          },
          {
            "name": "longitude",
            "title": "Longitude",
            "type": "`$NUMBER`",
            "short": "Longitude coordinate",
            "format": "double",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "Name of the location or establishment",
          },
          {
            "name": "state",
            "title": "State",
            "type": "`$STRING`",
            "short": "State or province",
          },
          {
            "name": "street",
            "title": "Street",
            "type": "`$STRING`",
            "short": "Street address",
          },
          {
            "name": "unisex",
            "title": "Unisex",
            "type": "`$BOOLEAN`",
            "short": "Whether the restroom is unisex/gender-neutral",
          },
          {
            "name": "updated_at",
            "title": "Updated At",
            "type": "`$STRING`",
            "short": "Timestamp when the restroom was last updated",
            "format": "date-time",
          },
          {
            "name": "upvote",
            "title": "Upvote",
            "type": "`$INTEGER`",
            "short": "Number of upvotes",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "restroom",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/restrooms",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "restrooms",
                  },
                ],
                "parts": [
                  "v1",
                  "restrooms",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "ada",
                      "orig": "ada",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 40.7128,
                    },
                    {
                      "name": "lng",
                      "orig": "lng",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": -74.006,
                    },
                    {
                      "name": "page",
                      "orig": "page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1,
                    },
                    {
                      "name": "per_page",
                      "orig": "per_page",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 10,
                    },
                    {
                      "name": "unisex",
                      "orig": "unisex",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "ada",
                    "lat",
                    "lng",
                    "page",
                    "per_page",
                    "unisex",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/restrooms/by_location",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "restrooms",
                  },
                  {
                    "lit": "by_location",
                  },
                ],
                "parts": [
                  "v1",
                  "restrooms",
                  "by_location",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "lng",
                      "orig": "lng",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "by_location",
                  "exist": [
                    "lat",
                    "lng",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/v1/restrooms/search",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "restrooms",
                  },
                  {
                    "lit": "search",
                  },
                ],
                "parts": [
                  "v1",
                  "restrooms",
                  "search",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "query",
                      "orig": "query",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                      "example": "New York, NY",
                    },
                  ],
                },
                "select": {
                  "$action": "search",
                  "exist": [
                    "query",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }

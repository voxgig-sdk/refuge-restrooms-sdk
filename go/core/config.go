package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "RefugeRestrooms",
			"slug": "refuge-restrooms",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://www.refugerestrooms.org/api",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"restroom": map[string]any{},
			},
		},
		"entity": map[string]any{
			"restroom": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "accessible",
						"short": "Whether the restroom is ADA accessible",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "changing_table",
						"short": "Whether a changing table is available",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "city",
						"short": "City name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "comment",
						"short": "Additional comments or notes",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"short": "Country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created_at",
						"short": "Timestamp when the restroom was added",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "directions",
						"short": "Directions to find the restroom",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "distance",
						"short": "Distance from search location in miles",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "downvote",
						"short": "Number of downvotes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the restroom",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "latitude",
						"short": "Latitude coordinate",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "longitude",
						"short": "Longitude coordinate",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the location or establishment",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
						"short": "State or province",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "street",
						"short": "Street address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "unisex",
						"short": "Whether the restroom is unisex/gender-neutral",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "updated_at",
						"short": "Timestamp when the restroom was last updated",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "upvote",
						"short": "Number of upvotes",
						"type": "`$INTEGER`",
					},
				},
				"name": "restroom",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "ada",
											"orig": "ada",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 40.7128,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": -74.006,
											"kind": "query",
											"name": "lng",
											"orig": "lng",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "page",
											"orig": "page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "per_page",
											"orig": "per_page",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "unisex",
											"orig": "unisex",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/restrooms",
								"parts": []any{
									"v1",
									"restrooms",
								},
								"select": map[string]any{
									"exist": []any{
										"ada",
										"lat",
										"lng",
										"page",
										"per_page",
										"unisex",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "lng",
											"orig": "lng",
											"reqd": true,
											"type": "`$NUMBER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/restrooms/by_location",
								"parts": []any{
									"v1",
									"restrooms",
									"by_location",
								},
								"select": map[string]any{
									"$action": "by_location",
									"exist": []any{
										"lat",
										"lng",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "New York, NY",
											"kind": "query",
											"name": "query",
											"orig": "query",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/restrooms/search",
								"parts": []any{
									"v1",
									"restrooms",
									"search",
								},
								"select": map[string]any{
									"$action": "search",
									"exist": []any{
										"query",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}

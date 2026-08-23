<?php
declare(strict_types=1);

// RefugeRestrooms SDK configuration

class RefugeRestroomsConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "RefugeRestrooms",
                "slug" => "refuge-restrooms",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://www.refugerestrooms.org/api",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "restroom" => [],
                ],
            ],
            "entity" => [
        'restroom' => [
          'fields' => [
            [
              'name' => 'accessible',
              'short' => 'Whether the restroom is ADA accessible',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'changing_table',
              'short' => 'Whether a changing table is available',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'city',
              'short' => 'City name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'comment',
              'short' => 'Additional comments or notes',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country',
              'short' => 'Country code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'created_at',
              'short' => 'Timestamp when the restroom was added',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'directions',
              'short' => 'Directions to find the restroom',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'distance',
              'short' => 'Distance from search location in miles',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'downvote',
              'short' => 'Number of downvotes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the restroom',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'latitude',
              'short' => 'Latitude coordinate',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'longitude',
              'short' => 'Longitude coordinate',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'name',
              'short' => 'Name of the location or establishment',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'state',
              'short' => 'State or province',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'street',
              'short' => 'Street address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'unisex',
              'short' => 'Whether the restroom is unisex/gender-neutral',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'updated_at',
              'short' => 'Timestamp when the restroom was last updated',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'upvote',
              'short' => 'Number of upvotes',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'restroom',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'ada',
                        'orig' => 'ada',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 40.7128,
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => -74.006,
                        'kind' => 'query',
                        'name' => 'lng',
                        'orig' => 'lng',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => 1,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'per_page',
                        'orig' => 'per_page',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'unisex',
                        'orig' => 'unisex',
                        'type' => '`$BOOLEAN`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/restrooms',
                  'parts' => [
                    'v1',
                    'restrooms',
                  ],
                  'select' => [
                    'exist' => [
                      'ada',
                      'lat',
                      'lng',
                      'page',
                      'per_page',
                      'unisex',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lng',
                        'orig' => 'lng',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/restrooms/by_location',
                  'parts' => [
                    'v1',
                    'restrooms',
                    'by_location',
                  ],
                  'select' => [
                    '$action' => 'by_location',
                    'exist' => [
                      'lat',
                      'lng',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'New York, NY',
                        'kind' => 'query',
                        'name' => 'query',
                        'orig' => 'query',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/restrooms/search',
                  'parts' => [
                    'v1',
                    'restrooms',
                    'search',
                  ],
                  'select' => [
                    '$action' => 'search',
                    'exist' => [
                      'query',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return RefugeRestroomsFeatures::make_feature($name);
    }
}

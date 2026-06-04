# RefugeRestrooms SDK

Find safe, gender-neutral restrooms by location or address

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Refuge Restrooms API

[Refuge Restrooms](https://www.refugerestrooms.org/) is a community-maintained directory of safe, gender-neutral, and accessible restroom locations. The project was created to help transgender, intersex, and gender-nonconforming people find restrooms they can use without harassment, and is sustained by volunteers and donor funding.

The API exposes the restroom records contributed by the community so third-party apps and maps can query the dataset directly.

What you get from the API:

- A `restrooms` collection covering venues that have been submitted and reviewed by the community
- Search by location (geographic coordinates) or by address, returning nearby matches
- Standard restroom metadata such as name, street/city/state, directions, accessibility, and unisex flags as recorded by submitters

The API is served from `https://www.refugerestrooms.org/api` (v1). No authentication key is documented for read access. CORS is not enabled by default, so browser apps may need a proxy.

## Try it

**TypeScript**
```bash
npm install refuge-restrooms
```

**Python**
```bash
pip install refuge-restrooms-sdk
```

**PHP**
```bash
composer require voxgig/refuge-restrooms-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/refuge-restrooms-sdk/go
```

**Ruby**
```bash
gem install refuge-restrooms-sdk
```

**Lua**
```bash
luarocks install refuge-restrooms-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { RefugeRestroomsSDK } from 'refuge-restrooms'

const client = new RefugeRestroomsSDK({})

// List all restrooms
const restrooms = await client.Restroom().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o refuge-restrooms-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "refuge-restrooms": {
      "command": "/abs/path/to/refuge-restrooms-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Restroom** | A community-submitted restroom record with location, address, and accessibility/unisex metadata; exposed under `/api/v1/restrooms` with search-by-location and search-by-address variants. | `/v1/restrooms` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from refugerestrooms_sdk import RefugeRestroomsSDK

client = RefugeRestroomsSDK({})

# List all restrooms
restrooms, err = client.Restroom(None).list(None, None)
```

### PHP

```php
<?php
require_once 'refugerestrooms_sdk.php';

$client = new RefugeRestroomsSDK([]);

// List all restrooms
[$restrooms, $err] = $client->Restroom(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/refuge-restrooms-sdk/go"

client := sdk.NewRefugeRestroomsSDK(map[string]any{})

// List all restrooms
restrooms, err := client.Restroom(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "RefugeRestrooms_sdk"

client = RefugeRestroomsSDK.new({})

# List all restrooms
restrooms, err = client.Restroom(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("refuge-restrooms_sdk")

local client = sdk.new({})

-- List all restrooms
local restrooms, err = client:Restroom(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = RefugeRestroomsSDK.test()
const result = await client.Restroom().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = RefugeRestroomsSDK.test(None, None)
result, err = client.Restroom(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = RefugeRestroomsSDK::test(null, null);
[$result, $err] = $client->Restroom(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Restroom(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = RefugeRestroomsSDK.test(nil, nil)
result, err = client.Restroom(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Restroom(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Refuge Restrooms API

- Upstream: [https://www.refugerestrooms.org/](https://www.refugerestrooms.org/)
- API docs: [https://www.refugerestrooms.org/api/docs/](https://www.refugerestrooms.org/api/docs/)

- Refuge Restrooms is a community-driven open-source project; the site footer marks the project "copyleft refuge restrooms".
- Source code is available on GitHub; consult the repository for the canonical licence text before redistributing data.
- Attribute Refuge Restrooms and link back to refugerestrooms.org when displaying API data.
- The project is donor-supported (Patreon); heavy users should be considerate with request volume.

---

Generated from the Refuge Restrooms API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

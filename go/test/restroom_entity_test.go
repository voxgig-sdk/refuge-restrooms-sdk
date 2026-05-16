package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/refuge-restrooms-sdk"
	"github.com/voxgig-sdk/refuge-restrooms-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestRestroomEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Restroom(nil)
		if ent == nil {
			t.Fatal("expected non-nil RestroomEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := restroomBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "restroom." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set REFUGERESTROOMS_TEST_RESTROOM_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		restroomRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.restroom", setup.data)))
		var restroomRef01Data map[string]any
		if len(restroomRef01DataRaw) > 0 {
			restroomRef01Data = core.ToMapAny(restroomRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = restroomRef01Data

		// LIST
		restroomRef01Ent := client.Restroom(nil)
		restroomRef01Match := map[string]any{}

		restroomRef01ListResult, err := restroomRef01Ent.List(restroomRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, restroomRef01ListOk := restroomRef01ListResult.([]any)
		if !restroomRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", restroomRef01ListResult)
		}

	})
}

func restroomBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "restroom", "RestroomTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read restroom test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse restroom test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"restroom01", "restroom02", "restroom03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("REFUGERESTROOMS_TEST_RESTROOM_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"REFUGERESTROOMS_TEST_RESTROOM_ENTID": idmap,
		"REFUGERESTROOMS_TEST_LIVE":      "FALSE",
		"REFUGERESTROOMS_TEST_EXPLAIN":   "FALSE",
		"REFUGERESTROOMS_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["REFUGERESTROOMS_TEST_RESTROOM_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["REFUGERESTROOMS_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["REFUGERESTROOMS_APIKEY"],
			},
			extra,
		})
		client = sdk.NewRefugeRestroomsSDK(core.ToMapAny(mergedOpts))
	}

	live := env["REFUGERESTROOMS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["REFUGERESTROOMS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}

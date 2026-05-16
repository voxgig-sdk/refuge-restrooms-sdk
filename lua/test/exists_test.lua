-- ProjectName SDK exists test

local sdk = require("refuge-restrooms_sdk")

describe("RefugeRestroomsSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)

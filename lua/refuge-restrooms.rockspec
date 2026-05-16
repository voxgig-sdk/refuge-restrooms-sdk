package = "voxgig-sdk-refuge-restrooms"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/refuge-restrooms-sdk.git"
}
description = {
  summary = "RefugeRestrooms SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["refuge-restrooms_sdk"] = "refuge-restrooms_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}

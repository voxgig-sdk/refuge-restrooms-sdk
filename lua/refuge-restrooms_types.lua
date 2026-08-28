-- Typed models for the RefugeRestrooms SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Restroom
---@field accessible? boolean
---@field changing_table? boolean
---@field city? string
---@field comment? string
---@field country? string
---@field created_at? string
---@field directions? string
---@field distance? number
---@field downvote? number
---@field id? number
---@field latitude? number
---@field longitude? number
---@field name? string
---@field state? string
---@field street? string
---@field unisex? boolean
---@field updated_at? string
---@field upvote? number

---@class RestroomListMatch
---@field ada? boolean
---@field lat? number
---@field lng? number
---@field page? number
---@field per_page? number
---@field unisex? boolean

local M = {}

return M

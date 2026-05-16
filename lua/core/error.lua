-- RefugeRestrooms SDK error

local RefugeRestroomsError = {}
RefugeRestroomsError.__index = RefugeRestroomsError


function RefugeRestroomsError.new(code, msg, ctx)
  local self = setmetatable({}, RefugeRestroomsError)
  self.is_sdk_error = true
  self.sdk = "RefugeRestrooms"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function RefugeRestroomsError:error()
  return self.msg
end


function RefugeRestroomsError:__tostring()
  return self.msg
end


return RefugeRestroomsError

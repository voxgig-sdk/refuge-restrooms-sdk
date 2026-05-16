# RefugeRestrooms SDK utility: make_context
require_relative '../core/context'
module RefugeRestroomsUtilities
  MakeContext = ->(ctxmap, basectx) {
    RefugeRestroomsContext.new(ctxmap, basectx)
  }
end

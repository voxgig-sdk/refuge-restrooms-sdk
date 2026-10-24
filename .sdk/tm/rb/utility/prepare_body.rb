# RefugeRestrooms SDK utility: prepare_body
require_relative 'media'
module RefugeRestroomsUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return RefugeRestroomsUtilities.raw_body(ctx.reqdata) if RefugeRestroomsUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end

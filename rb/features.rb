# RefugeRestrooms SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module RefugeRestroomsFeatures
  def self.make_feature(name)
    case name
    when "base"
      RefugeRestroomsBaseFeature.new
    when "ratelimit"
      RefugeRestroomsRatelimitFeature.new
    when "retry"
      RefugeRestroomsRetryFeature.new
    when "test"
      RefugeRestroomsTestFeature.new
    when "timeout"
      RefugeRestroomsTimeoutFeature.new
    else
      RefugeRestroomsBaseFeature.new
    end
  end
end

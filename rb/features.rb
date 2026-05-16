# RefugeRestrooms SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module RefugeRestroomsFeatures
  def self.make_feature(name)
    case name
    when "base"
      RefugeRestroomsBaseFeature.new
    when "test"
      RefugeRestroomsTestFeature.new
    else
      RefugeRestroomsBaseFeature.new
    end
  end
end

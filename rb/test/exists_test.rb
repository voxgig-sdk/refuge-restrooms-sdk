# RefugeRestrooms SDK exists test

require "minitest/autorun"
require_relative "../RefugeRestrooms_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = RefugeRestroomsSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end

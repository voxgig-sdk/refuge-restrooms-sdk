# RefugeRestrooms SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

RefugeRestroomsUtility.registrar = ->(u) {
  u.clean = RefugeRestroomsUtilities::Clean
  u.done = RefugeRestroomsUtilities::Done
  u.make_error = RefugeRestroomsUtilities::MakeError
  u.feature_add = RefugeRestroomsUtilities::FeatureAdd
  u.feature_hook = RefugeRestroomsUtilities::FeatureHook
  u.feature_init = RefugeRestroomsUtilities::FeatureInit
  u.fetcher = RefugeRestroomsUtilities::Fetcher
  u.make_fetch_def = RefugeRestroomsUtilities::MakeFetchDef
  u.make_context = RefugeRestroomsUtilities::MakeContext
  u.make_options = RefugeRestroomsUtilities::MakeOptions
  u.make_request = RefugeRestroomsUtilities::MakeRequest
  u.make_response = RefugeRestroomsUtilities::MakeResponse
  u.make_result = RefugeRestroomsUtilities::MakeResult
  u.make_point = RefugeRestroomsUtilities::MakePoint
  u.make_spec = RefugeRestroomsUtilities::MakeSpec
  u.make_url = RefugeRestroomsUtilities::MakeUrl
  u.param = RefugeRestroomsUtilities::Param
  u.prepare_auth = RefugeRestroomsUtilities::PrepareAuth
  u.prepare_body = RefugeRestroomsUtilities::PrepareBody
  u.prepare_headers = RefugeRestroomsUtilities::PrepareHeaders
  u.prepare_method = RefugeRestroomsUtilities::PrepareMethod
  u.prepare_params = RefugeRestroomsUtilities::PrepareParams
  u.prepare_path = RefugeRestroomsUtilities::PreparePath
  u.prepare_query = RefugeRestroomsUtilities::PrepareQuery
  u.result_basic = RefugeRestroomsUtilities::ResultBasic
  u.result_body = RefugeRestroomsUtilities::ResultBody
  u.result_headers = RefugeRestroomsUtilities::ResultHeaders
  u.transform_request = RefugeRestroomsUtilities::TransformRequest
  u.transform_response = RefugeRestroomsUtilities::TransformResponse
}

<?php
declare(strict_types=1);

// RefugeRestrooms SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

RefugeRestroomsUtility::setRegistrar(function (RefugeRestroomsUtility $u): void {
    $u->clean = [RefugeRestroomsClean::class, 'call'];
    $u->done = [RefugeRestroomsDone::class, 'call'];
    $u->make_error = [RefugeRestroomsMakeError::class, 'call'];
    $u->feature_add = [RefugeRestroomsFeatureAdd::class, 'call'];
    $u->feature_hook = [RefugeRestroomsFeatureHook::class, 'call'];
    $u->feature_init = [RefugeRestroomsFeatureInit::class, 'call'];
    $u->fetcher = [RefugeRestroomsFetcher::class, 'call'];
    $u->make_fetch_def = [RefugeRestroomsMakeFetchDef::class, 'call'];
    $u->make_context = [RefugeRestroomsMakeContext::class, 'call'];
    $u->make_options = [RefugeRestroomsMakeOptions::class, 'call'];
    $u->make_request = [RefugeRestroomsMakeRequest::class, 'call'];
    $u->make_response = [RefugeRestroomsMakeResponse::class, 'call'];
    $u->make_result = [RefugeRestroomsMakeResult::class, 'call'];
    $u->make_point = [RefugeRestroomsMakePoint::class, 'call'];
    $u->make_spec = [RefugeRestroomsMakeSpec::class, 'call'];
    $u->make_url = [RefugeRestroomsMakeUrl::class, 'call'];
    $u->param = [RefugeRestroomsParam::class, 'call'];
    $u->prepare_auth = [RefugeRestroomsPrepareAuth::class, 'call'];
    $u->prepare_body = [RefugeRestroomsPrepareBody::class, 'call'];
    $u->prepare_headers = [RefugeRestroomsPrepareHeaders::class, 'call'];
    $u->prepare_method = [RefugeRestroomsPrepareMethod::class, 'call'];
    $u->prepare_params = [RefugeRestroomsPrepareParams::class, 'call'];
    $u->prepare_path = [RefugeRestroomsPreparePath::class, 'call'];
    $u->prepare_query = [RefugeRestroomsPrepareQuery::class, 'call'];
    $u->result_basic = [RefugeRestroomsResultBasic::class, 'call'];
    $u->result_body = [RefugeRestroomsResultBody::class, 'call'];
    $u->result_headers = [RefugeRestroomsResultHeaders::class, 'call'];
    $u->transform_request = [RefugeRestroomsTransformRequest::class, 'call'];
    $u->transform_response = [RefugeRestroomsTransformResponse::class, 'call'];
});

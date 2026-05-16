<?php
declare(strict_types=1);

// RefugeRestrooms SDK utility: result_headers

class RefugeRestroomsResultHeaders
{
    public static function call(RefugeRestroomsContext $ctx): ?RefugeRestroomsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}

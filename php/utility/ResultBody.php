<?php
declare(strict_types=1);

// RefugeRestrooms SDK utility: result_body

class RefugeRestroomsResultBody
{
    public static function call(RefugeRestroomsContext $ctx): ?RefugeRestroomsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}

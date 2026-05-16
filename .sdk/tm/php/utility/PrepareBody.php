<?php
declare(strict_types=1);

// RefugeRestrooms SDK utility: prepare_body

class RefugeRestroomsPrepareBody
{
    public static function call(RefugeRestroomsContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}

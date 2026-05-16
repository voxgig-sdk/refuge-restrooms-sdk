<?php
declare(strict_types=1);

// RefugeRestrooms SDK utility: feature_add

class RefugeRestroomsFeatureAdd
{
    public static function call(RefugeRestroomsContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}

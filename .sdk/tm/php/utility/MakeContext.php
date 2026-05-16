<?php
declare(strict_types=1);

// RefugeRestrooms SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class RefugeRestroomsMakeContext
{
    public static function call(array $ctxmap, ?RefugeRestroomsContext $basectx): RefugeRestroomsContext
    {
        return new RefugeRestroomsContext($ctxmap, $basectx);
    }
}

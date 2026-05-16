<?php
declare(strict_types=1);

// RefugeRestrooms SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class RefugeRestroomsFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new RefugeRestroomsBaseFeature();
            case "test":
                return new RefugeRestroomsTestFeature();
            default:
                return new RefugeRestroomsBaseFeature();
        }
    }
}

<?php
declare(strict_types=1);

// RefugeRestrooms SDK base feature

class RefugeRestroomsBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(RefugeRestroomsContext $ctx, array $options): void {}
    public function PostConstruct(RefugeRestroomsContext $ctx): void {}
    public function PostConstructEntity(RefugeRestroomsContext $ctx): void {}
    public function SetData(RefugeRestroomsContext $ctx): void {}
    public function GetData(RefugeRestroomsContext $ctx): void {}
    public function GetMatch(RefugeRestroomsContext $ctx): void {}
    public function SetMatch(RefugeRestroomsContext $ctx): void {}
    public function PrePoint(RefugeRestroomsContext $ctx): void {}
    public function PreSpec(RefugeRestroomsContext $ctx): void {}
    public function PreRequest(RefugeRestroomsContext $ctx): void {}
    public function PreResponse(RefugeRestroomsContext $ctx): void {}
    public function PreResult(RefugeRestroomsContext $ctx): void {}
    public function PreDone(RefugeRestroomsContext $ctx): void {}
    public function PreUnexpected(RefugeRestroomsContext $ctx): void {}
}

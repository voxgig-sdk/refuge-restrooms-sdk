# Typed models for the RefugeRestrooms SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Restroom(TypedDict, total=False):
    accessible: bool
    changing_table: bool
    city: str
    comment: str
    country: str
    created_at: str
    direction: str
    distance: float
    downvote: int
    id: int
    latitude: float
    longitude: float
    name: str
    state: str
    street: str
    unisex: bool
    updated_at: str
    upvote: int


class RestroomListMatch(TypedDict, total=False):
    accessible: bool
    changing_table: bool
    city: str
    comment: str
    country: str
    created_at: str
    direction: str
    distance: float
    downvote: int
    id: int
    latitude: float
    longitude: float
    name: str
    state: str
    street: str
    unisex: bool
    updated_at: str
    upvote: int

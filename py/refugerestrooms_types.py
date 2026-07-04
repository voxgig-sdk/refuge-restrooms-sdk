# Typed models for the RefugeRestrooms SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Restroom:
    accessible: Optional[bool] = None
    changing_table: Optional[bool] = None
    city: Optional[str] = None
    comment: Optional[str] = None
    country: Optional[str] = None
    created_at: Optional[str] = None
    direction: Optional[str] = None
    distance: Optional[float] = None
    downvote: Optional[int] = None
    id: Optional[int] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    name: Optional[str] = None
    state: Optional[str] = None
    street: Optional[str] = None
    unisex: Optional[bool] = None
    updated_at: Optional[str] = None
    upvote: Optional[int] = None


@dataclass
class RestroomListMatch:
    accessible: Optional[bool] = None
    changing_table: Optional[bool] = None
    city: Optional[str] = None
    comment: Optional[str] = None
    country: Optional[str] = None
    created_at: Optional[str] = None
    direction: Optional[str] = None
    distance: Optional[float] = None
    downvote: Optional[int] = None
    id: Optional[int] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    name: Optional[str] = None
    state: Optional[str] = None
    street: Optional[str] = None
    unisex: Optional[bool] = None
    updated_at: Optional[str] = None
    upvote: Optional[int] = None


# frozen_string_literal: true

# Typed models for the RefugeRestrooms SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Restroom entity data model.
#
# @!attribute [rw] accessible
#   @return [Boolean, nil]
#
# @!attribute [rw] changing_table
#   @return [Boolean, nil]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] comment
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] direction
#   @return [String, nil]
#
# @!attribute [rw] distance
#   @return [Float, nil]
#
# @!attribute [rw] downvote
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] street
#   @return [String, nil]
#
# @!attribute [rw] unisex
#   @return [Boolean, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] upvote
#   @return [Integer, nil]
Restroom = Struct.new(
  :accessible,
  :changing_table,
  :city,
  :comment,
  :country,
  :created_at,
  :direction,
  :distance,
  :downvote,
  :id,
  :latitude,
  :longitude,
  :name,
  :state,
  :street,
  :unisex,
  :updated_at,
  :upvote,
  keyword_init: true
)

# Request payload for Restroom#list.
#
# @!attribute [rw] accessible
#   @return [Boolean, nil]
#
# @!attribute [rw] changing_table
#   @return [Boolean, nil]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] comment
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] direction
#   @return [String, nil]
#
# @!attribute [rw] distance
#   @return [Float, nil]
#
# @!attribute [rw] downvote
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] street
#   @return [String, nil]
#
# @!attribute [rw] unisex
#   @return [Boolean, nil]
#
# @!attribute [rw] updated_at
#   @return [String, nil]
#
# @!attribute [rw] upvote
#   @return [Integer, nil]
RestroomListMatch = Struct.new(
  :accessible,
  :changing_table,
  :city,
  :comment,
  :country,
  :created_at,
  :direction,
  :distance,
  :downvote,
  :id,
  :latitude,
  :longitude,
  :name,
  :state,
  :street,
  :unisex,
  :updated_at,
  :upvote,
  keyword_init: true
)


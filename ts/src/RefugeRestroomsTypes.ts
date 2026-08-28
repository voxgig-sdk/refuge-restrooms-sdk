// Typed models for the RefugeRestrooms SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Restroom {
  accessible?: boolean
  changing_table?: boolean
  city?: string
  comment?: string
  country?: string
  created_at?: string
  directions?: string
  distance?: number
  downvote?: number
  id?: number
  latitude?: number
  longitude?: number
  name?: string
  state?: string
  street?: string
  unisex?: boolean
  updated_at?: string
  upvote?: number
}

export interface RestroomListMatch {
  ada?: boolean
  lat?: number
  lng?: number
  page?: number
  per_page?: number
  unisex?: boolean

  // Selects a custom action instead of the plain list:
  //   'by_location' | 'search'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}


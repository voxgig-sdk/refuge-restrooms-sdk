# RefugeRestrooms SDK utility: feature_add
module RefugeRestroomsUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end

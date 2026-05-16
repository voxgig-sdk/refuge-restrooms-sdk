package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewRestroomEntityFunc func(client *RefugeRestroomsSDK, entopts map[string]any) RefugeRestroomsEntity


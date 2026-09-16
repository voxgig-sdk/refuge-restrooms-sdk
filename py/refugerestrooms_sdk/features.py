# RefugeRestrooms SDK feature factory

from refugerestrooms_sdk.feature.base_feature import RefugeRestroomsBaseFeature
from refugerestrooms_sdk.feature.ratelimit_feature import RefugeRestroomsRatelimitFeature
from refugerestrooms_sdk.feature.retry_feature import RefugeRestroomsRetryFeature
from refugerestrooms_sdk.feature.test_feature import RefugeRestroomsTestFeature
from refugerestrooms_sdk.feature.timeout_feature import RefugeRestroomsTimeoutFeature


_FEATURES = {
    "base": lambda: RefugeRestroomsBaseFeature(),
    "ratelimit": lambda: RefugeRestroomsRatelimitFeature(),
    "retry": lambda: RefugeRestroomsRetryFeature(),
    "test": lambda: RefugeRestroomsTestFeature(),
    "timeout": lambda: RefugeRestroomsTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES

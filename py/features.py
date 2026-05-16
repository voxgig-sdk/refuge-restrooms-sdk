# RefugeRestrooms SDK feature factory

from feature.base_feature import RefugeRestroomsBaseFeature
from feature.test_feature import RefugeRestroomsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: RefugeRestroomsBaseFeature(),
        "test": lambda: RefugeRestroomsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()

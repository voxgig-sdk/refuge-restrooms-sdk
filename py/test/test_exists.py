# ProjectName SDK exists test

import pytest
from refugerestrooms_sdk import RefugeRestroomsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = RefugeRestroomsSDK.test(None, None)
        assert testsdk is not None

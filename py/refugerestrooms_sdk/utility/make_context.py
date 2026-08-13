# RefugeRestrooms SDK utility: make_context

from refugerestrooms_sdk.core.context import RefugeRestroomsContext


def make_context_util(ctxmap, basectx):
    return RefugeRestroomsContext(ctxmap, basectx)

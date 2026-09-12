import { RefugeRestroomsEntityBase } from '../RefugeRestroomsEntityBase';
import type { RefugeRestroomsSDK } from '../RefugeRestroomsSDK';
import type { Control } from '../types';
import type { Restroom, RestroomListMatch } from '../RefugeRestroomsTypes';
declare class RestroomEntity extends RefugeRestroomsEntityBase<Restroom> {
    constructor(client: RefugeRestroomsSDK, entopts: any);
    make(this: RestroomEntity): RestroomEntity;
    list(this: any, reqmatch?: RestroomListMatch, ctrl?: Control): Promise<RestroomEntity[]>;
}
export { RestroomEntity };

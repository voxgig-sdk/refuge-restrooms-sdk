"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefugeRestroomsError = void 0;
class RefugeRestroomsError extends Error {
    isRefugeRestroomsError = true;
    sdk = 'RefugeRestrooms';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.RefugeRestroomsError = RefugeRestroomsError;
//# sourceMappingURL=RefugeRestroomsError.js.map
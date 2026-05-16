
import { Context } from './Context'


class RefugeRestroomsError extends Error {

  isRefugeRestroomsError = true

  sdk = 'RefugeRestrooms'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  RefugeRestroomsError
}


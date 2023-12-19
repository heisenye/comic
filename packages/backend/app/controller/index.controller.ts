import { Context } from 'koa'
import msg from '../constants/message'

class IndexController {
  public index(ctx: Context) {
    ctx.body = 'Hello World'
  }

  public async getMsg(ctx: Context) {
    ctx.status = 200
    ctx.body = Object.values(msg)
  }
}

export default new IndexController()

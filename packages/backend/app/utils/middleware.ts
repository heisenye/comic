import { Context, Next } from 'koa'
import { Types } from 'mongoose'
import Response from '../utils/response'
import { ResponseCode } from '../constants/status'
import { JwtPayload, verify } from 'jsonwebtoken'
const secretKey = process.env.SECRET_KEY as string
const refererUrl = process.env.REFERER_URL as string

export default class Middleware {
  public static async checkReferer(ctx: Context, next: Next) {
    const referer = ctx.request.header.referer
    if (referer && referer.startsWith(refererUrl)) {
      await next()
    } else {
      ctx.response.status = ResponseCode.Forbidden
      ctx.body = Response.Forbidden()
    }
  }

  public static async validateObjectId(ctx: Context, next: Next): Promise<void> {
    const { id } = ctx.params
    if (!Types.ObjectId.isValid(id)) {
      ctx.response.status = ResponseCode.Bad_Request
      ctx.body = Response.InValidId()
    }
    await next()
  }

  public static async validateChapter(ctx: Context, next: Next): Promise<void> {
    const { chapter } = ctx.params
    if (isNaN(Number(chapter))) {
      ctx.response.status = ResponseCode.Bad_Request
      ctx.body = Response.InValidChapter()
    }
    await next()
  }

  public static async auth(ctx: Context, next: Next) {
    const token = ctx.header.authorization ? String(ctx.header.authorization).split(' ')[1] : null
    if (!token) {
      ctx.response.status = ResponseCode.Unauthorized
      ctx.body = Response.NoToken()
      return
    }
    try {
      const decoded = verify(token, secretKey) as JwtPayload
      ctx.state.userId = decoded.id
    } catch (error) {
      ctx.response.status = ResponseCode.Unauthorized
      ctx.body = Response.InvalidToken()
      return
    }
    await next()
  }
}

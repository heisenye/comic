import * as path from 'path'
import { Context } from 'koa'
import User, { IUser } from '../model/user.model'
import { scryptSync } from 'crypto'
import { sign } from 'jsonwebtoken'
import { ResponseCode } from '../constants/status'
import Response from '../utils/response'
import sharp = require('sharp')
const secretKey = process.env.SECRET_KEY as string
class UserController {
  public async getUsers(ctx: Context) {
    const users = await User.find({})
    ctx.body = Response.Success<IUser[]>({ data: users })
  }

  public async getUser(ctx: Context) {
    const { username } = ctx.params
    const user = await User.findOne({ username: username })
    if (!user) {
      ctx.response.status = ResponseCode.Unauthorized
      ctx.body = Response.NoUser()
      return
    }
    ctx.body = Response.Success<IUser>({ data: user })
  }

  public async login(ctx: Context) {
    const { username, pwd } = ctx.request['body']
    const user = await User.findOne({ username: username })

    if (!user) {
      ctx.response.status = ResponseCode.Unauthorized
      ctx.body = Response.NoUser()
      return
    }

    const [salt, storedHash] = user.password.split(':')
    const hash = scryptSync(pwd, salt, 64).toString('hex')

    if (hash !== storedHash) {
      ctx.response.status = ResponseCode.Unauthorized
      ctx.body = Response.InvalidCredentials()
      return
    }

    const token = sign({ id: user._id }, secretKey, { expiresIn: '14d' })
    const { createdAt, _id: id } = user

    ctx.body = Response.Success({
      data: {
        id,
        username,
        createdAt: new Date(createdAt).toLocaleDateString(),
        token
      }
    })
  }

  public async register(ctx: Context) {
    const { username, pwd } = ctx.request['body']
    const existingUser = await User.findOne({ username })

    if (existingUser) {
      ctx.response.status = ResponseCode.Conflict
      ctx.body = Response.UserAlreadyExists()
      return
    }
    const user = await User.create({ username, password: pwd })
    ctx.body = Response.Success<IUser>({ data: user })
  }

  public async profile(ctx: Context) {
    const id = ctx.state.userId
    const user = await User.findById(id)
    if (!user) {
      ctx.response.status = ResponseCode.Unauthorized
      ctx.body = Response.NoUser()
      return
    }
    const { username, createdAt } = user
    ctx.body = Response.Success({
      data: {
        id,
        username,
        createdAt: new Date(createdAt).toLocaleDateString()
      }
    })
  }

  public async uploadAvatar(ctx: Context) {
    const id = ctx.state.userId
    const { buffer } = ctx.file

    const newFilename = `${id}.webp`
    const directoryPath = path.resolve(__dirname, '../', 'public/avatar')
    const filePath = path.join(directoryPath, newFilename)
    sharp(buffer)
      .resize(300, 300)
      .toFile(filePath, (err) => {
        if (err) {
          console.error(err)
        }
      })

    const user = await User.findOne({ _id: id })
    if (!user) {
      ctx.response.status = ResponseCode.Unauthorized
      ctx.body = Response.NoUser()
      return
    }
    ctx.body = Response.Success({ data: true })
  }
}

export default new UserController()

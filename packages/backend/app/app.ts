import Koa = require('koa')
import cors = require('@koa/cors')
import serve = require('koa-static')
import { bodyParser } from '@koa/bodyparser'
import indexRouter from './router/index'
import comicsRouter from './router/comics'
import userRouter from './router/user'
import { Server } from 'http'
import logger from './logger'

const app = new Koa()
app.use(cors())
app.use(serve(__dirname + '/public'))
app.use(bodyParser())

app.use(indexRouter.routes())
app.use(comicsRouter.routes())
app.use(userRouter.routes()).use(userRouter.allowedMethods())

const run = (port: number): Server => {
  return app.listen(port, () => {
    logger.info(`Server is running on port ${port}`)
  })
}

export default run

import Koa = require('koa')
import cors = require('@koa/cors')
import serve = require('koa-static')
import ratelimit = require('koa-ratelimit')
import { bodyParser } from '@koa/bodyparser'
import indexRouter from './router/index'
import comicsRouter from './router/comics'
import userRouter from './router/user'
import { Server } from 'http'
import logger from './logger'

const app = new Koa()
app.use(cors(
  {exposeHeaders: ['Rate-Limit-Remaining', 'Rate-Limit-Reset', 'Rate-Limit-Total', 'Retry-After']}
))
app.use(ratelimit({
  driver: 'memory',
  db: new Map(),
  duration: 60000,
  id: (ctx) => ctx.ip,
  headers: {
    remaining: 'Rate-Limit-Remaining',
    reset: 'Rate-Limit-Reset',
    total: 'Rate-Limit-Total'
  },
  max: 120,
  disableHeader: false,
}))

app.use(serve(__dirname + '/public'))
app.use(bodyParser())

app.use(indexRouter.routes())
app.use(comicsRouter.routes()).use(comicsRouter.allowedMethods())
app.use(userRouter.routes()).use(userRouter.allowedMethods())

const run = (port: number): Server => {
  return app.listen(port, () => {
    logger.info(`Server is running on port ${port}`)
  })
}

export default run

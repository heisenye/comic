const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()

const router = new Router()

async function mid(ctx, next) {
  console.log(2)
  await next()
}

router.get("/",mid, async (ctx, next) => {
  ctx.body = "Hello World!"
  console.log(1)
})
app.use(router.routes())

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})

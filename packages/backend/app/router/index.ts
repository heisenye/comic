import Router = require('@koa/router')
import indexController from '../controller/index.controller'
const router = new Router()

router.get('/', indexController.index)
router.get('/msg', indexController.getMsg)
export default router

'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var Router = require('@koa/router')
var router = new Router({ prefix: '/api' })
var user_controller_1 = require('../controller/user.controller')
var middleware_1 = require('../utils/middleware')
var multer = require('@koa/multer')
var upload = multer()
router.get('/users', user_controller_1.default.getUsers)
router.post('/register', user_controller_1.default.register)
router.post('/login', user_controller_1.default.login)
router.get('/users/:username', user_controller_1.default.getUser)
router.post('/profile', middleware_1.default.auth, user_controller_1.default.profile)
router.post(
  '/profile/avatar',
  middleware_1.default.auth,
  upload.single('avatar'),
  user_controller_1.default.uploadAvatar
)
exports.default = router

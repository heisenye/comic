import Router = require('@koa/router')
const router = new Router({ prefix: '/api' })
import userController from '../controller/user.controller'
import Middleware from '../utils/middleware'
import multer = require('@koa/multer')
const upload = multer()

router.get('/users', userController.getUsers)

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/users/:username', userController.getUser)

router.post('/profile', Middleware.auth, userController.profile)
router.post(
  '/profile/avatar',
  Middleware.auth,
  upload.single('avatar'),
  userController.uploadAvatar
)

export default router

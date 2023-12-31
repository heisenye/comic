'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var Router = require('@koa/router')
var router = new Router({ prefix: '/api' })
var comic_controller_1 = require('../controller/comic.controller')
var user_controller_1 = require('../controller/user.controller')
var multer = require('@koa/multer')
var upload = multer()
router.get('/comics', comic_controller_1.default.getComics)
router.get('/comics/:id', comic_controller_1.default.getComic)
router.get('/comics/:id/:chapter', comic_controller_1.default.getComicImages)
router.get('/history', comic_controller_1.default.getHistoryComics)
router.post(
  '/favorite',
  user_controller_1.default.auth,
  comic_controller_1.default.createFavoriteComic
)
router.delete(
  '/favorites/:id',
  user_controller_1.default.auth,
  comic_controller_1.default.deleteFavoriteComic
)
router.get(
  '/favorites',
  user_controller_1.default.auth,
  comic_controller_1.default.getFavoriteComics
)
router.get(
  '/favorites/:id',
  user_controller_1.default.auth,
  comic_controller_1.default.getFavoriteComic
)
router.get('/search', comic_controller_1.default.getSearchComics)
router.post('/comic', comic_controller_1.default.createComic)
router.patch('/comic/:id', comic_controller_1.default.updateComic)
router.post(
  '/comics/:id/:chapter',
  upload.array('images'),
  comic_controller_1.default.createComicChapter
)
router.put('/comics/:id/cover', comic_controller_1.default.setComicCover)
exports.default = router

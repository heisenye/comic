'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var Router = require('@koa/router')
var router = new Router({ prefix: '/api' })
var comic_controller_1 = require('../controller/comic.controller')
var middleware_1 = require('../utils/middleware')
var multer = require('@koa/multer')
var upload = multer()
router.get('/comics', comic_controller_1.default.getComics)
router.get(
  '/comics/:id',
  middleware_1.default.validateObjectId,
  comic_controller_1.default.getComic
)
router.get(
  '/comics/:id/:chapter',
  middleware_1.default.validateObjectId,
  middleware_1.default.validateChapter,
  comic_controller_1.default.getComicImages
)
router.get('/history', comic_controller_1.default.getHistoryComics)
router.post('/favorite', middleware_1.default.auth, comic_controller_1.default.createFavoriteComic)
router.delete(
  '/favorites/:id',
  middleware_1.default.auth,
  middleware_1.default.validateObjectId,
  comic_controller_1.default.deleteFavoriteComic
)
router.get('/favorites', middleware_1.default.auth, comic_controller_1.default.getFavoriteComics)
router.get(
  '/favorites/:id',
  middleware_1.default.auth,
  middleware_1.default.validateObjectId,
  comic_controller_1.default.getFavoriteComic
)
router.get('/search', comic_controller_1.default.getSearchComics)
router.post('/comic', comic_controller_1.default.createComic)
router.patch(
  '/comic/:id',
  middleware_1.default.validateObjectId,
  comic_controller_1.default.updateComic
)
router.post(
  '/comics/:id/:chapter',
  middleware_1.default.validateObjectId,
  middleware_1.default.validateChapter,
  upload.array('images'),
  comic_controller_1.default.createComicChapter
)
router.put(
  '/comics/:id/cover',
  middleware_1.default.validateObjectId,
  comic_controller_1.default.setComicCover
)
exports.default = router

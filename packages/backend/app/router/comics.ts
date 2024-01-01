import Router = require('@koa/router')
const router = new Router({ prefix: '/api' })
import comicController from '../controller/comic.controller'
import Middleware from '../utils/middleware'
import multer = require('@koa/multer')
const upload = multer()

router.get('/comics', comicController.getComics)
router.get('/comics/:id', Middleware.validateObjectId, comicController.getComic)
router.get(
  '/comics/:id/:chapter',
  Middleware.validateObjectId,
  Middleware.validateChapter,
  comicController.getComicImages
)
router.get('/history', comicController.getHistoryComics)
router.post('/favorite', Middleware.auth, comicController.createFavoriteComic)
router.delete(
  '/favorites/:id',
  Middleware.auth,
  Middleware.validateObjectId,
  comicController.deleteFavoriteComic
)
router.get('/favorites', Middleware.auth, comicController.getFavoriteComics)
router.get(
  '/favorites/:id',
  Middleware.auth,
  Middleware.validateObjectId,
  comicController.getFavoriteComic
)
router.get('/search', comicController.getSearchComics)

router.post('/comic', comicController.createComic)
router.patch('/comic/:id', Middleware.validateObjectId, comicController.updateComic)
router.post(
  '/comics/:id/:chapter',
  Middleware.validateObjectId,
  Middleware.validateChapter,
  upload.array('images'),
  comicController.createComicChapter
)
router.put('/comics/:id/cover', Middleware.validateObjectId, comicController.setComicCover)

export default router

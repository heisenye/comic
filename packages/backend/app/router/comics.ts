import Router = require('@koa/router')
const router = new Router({ prefix: '/api' })
import comicController from '../controller/comic.controller'
import userController from '../controller/user.controller'
import multer = require('@koa/multer')
const upload = multer()

router.get('/comics', comicController.getComics)
router.get('/comics/:id', comicController.getComic)
router.get('/comics/:id/:chapter', comicController.getComicImages)
router.get('/history', comicController.getHistoryComics)
router.post('/favorite', userController.auth, comicController.createFavoriteComic)
router.delete('/favorites/:id', userController.auth, comicController.deleteFavoriteComic)
router.get('/favorites', userController.auth, comicController.getFavoriteComics)
router.get('/favorites/:id', userController.auth, comicController.getFavoriteComic)
router.get('/search', comicController.getSearchComics)

router.post('/comic', comicController.createComic)
router.patch('/comic/:id', comicController.updateComic)
router.post('/comics/:id/:chapter', upload.array('images'), comicController.createComicChapter)
router.put('/comics/:id/cover', comicController.setComicCover)

export default router

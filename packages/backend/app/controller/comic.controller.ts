import * as fs from 'fs'
import * as path from 'path'
import { Context } from 'koa'
import multer = require('@koa/multer')
import mongoose from 'mongoose'
import ComicModel, { IComic } from '../model/comic.model'
import ComicChapterModel, { IComicChapter } from '../model/comicChapter.model'
import Favorite from '../model/favorite.model'
import Response from '../utils/response'
import { ResponseCode } from '../constants/status'
import sharp = require('sharp')

class ComicController {
  public async getComics(ctx: Context) {
    try {
      const comics = await ComicModel.find({})
      ctx.response.status = ResponseCode.OK
      ctx.body = Response.Success<IComic[]>({ data: comics })
    } catch (error) {
      console.error(error)
      ctx.body = Response.UnknownError(error as Error)
    }
  }

  public async getComic(ctx: Context) {
    try {
      const { id } = ctx.params
      if (!mongoose.Types.ObjectId.isValid(id)) {
        ctx.response.status = ResponseCode.Bad_Request
        ctx.body = Response.InValidId()
        return
      }
      const comic = await ComicModel.findOne({ _id: id })
      if (!comic) {
        ctx.response.status = ResponseCode.Not_Found
        ctx.body = Response.NoComic()
        return
      }
      ctx.body = Response.Success<IComic>({ data: comic })
    } catch (error) {
      ctx.body = Response.UnknownError(error as Error)
    }
  }

  public async getComicImages(ctx: Context) {
    try {
      const { id, chapter } = ctx.params
      if (!mongoose.Types.ObjectId.isValid(id)) {
        ctx.response.status = ResponseCode.Bad_Request
        ctx.body = Response.InValidId()
        return
      }
      if (isNaN(Number(chapter))) {
        ctx.response.status = ResponseCode.Bad_Request
        ctx.body = Response.InValidChapter()
        return
      }
      const comicImages = await ComicChapterModel.findOne({ comicId: id, chapter: Number(chapter) })
      if (!comicImages) {
        ctx.response.status = ResponseCode.Not_Found
        ctx.body = Response.NoComic()
        return
      }
      ctx.response.status = ResponseCode.OK
      ctx.body = Response.Success<IComicChapter>({ data: comicImages })
    } catch (error) {
      console.error(error)
      ctx.body = Response.UnknownError(error as Error)
    }
  }

  public async getHistoryComics(ctx: Context) {
    try {
      const ids = ctx.query.id
      if (!ids) {
        ctx.response.status = ResponseCode.OK
        ctx.body = Response.Success({ data: [] })
        return
      }
      if (typeof ids === 'string') {
        const historyComic = await ComicModel.findOne({ _id: ids })
        if (!historyComic) {
          ctx.response.status = ResponseCode.Not_Found
          ctx.body = Response.NoComic()
          return
        }
        ctx.response.status = ResponseCode.OK
        ctx.body = Response.Success<IComic[]>({ data: [historyComic] })
        return
      }
      const unorderedHistoryComics = await ComicModel.find({ _id: { $in: ids } })
      const orderedHistoryComics = ids
        .map((id) => unorderedHistoryComics.find((comic) => comic._id.toString() === id))
        .filter((comic) => comic !== undefined) as IComic[]

      ctx.response.status = ResponseCode.OK
      ctx.body = Response.Success<IComic[]>({ data: orderedHistoryComics })
    } catch (error) {
      console.error(error)
      ctx.body = Response.UnknownError(error as Error)
    }
  }

  public async createFavoriteComic(ctx: Context) {
    let favoriteRecord = null
    try {
      const userId = ctx.state.userId
      const { id: comicId } = ctx.request['body']
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(comicId)) {
        ctx.response.status = ResponseCode.Bad_Request
        ctx.body = Response.InValidId()
        return
      }
      favoriteRecord = await Favorite.create({ userId, comicId })
      await ComicModel.updateOne({ _id: comicId }, { $inc: { favoriteCount: 1 } })
      ctx.response.status = ResponseCode.OK
      ctx.body = Response.Success({})
    } catch (error) {
      if (favoriteRecord) {
        await Favorite.deleteOne({ _id: favoriteRecord._id })
      }
      console.error(error)
      ctx.body = Response.UnknownError(error as Error)
    }
  }

  public async deleteFavoriteComic(ctx: Context) {
    try {
      const userId = ctx.state.userId
      const { id: comicId } = ctx.params
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(comicId)) {
        console.log(111)
        ctx.response.status = ResponseCode.Bad_Request
        ctx.body = Response.InValidId()
        return
      }
      const deleteResult = await Favorite.deleteOne({
        userId,
        comicId
      })
      if (deleteResult.deletedCount === 0) {
        ctx.response.status = ResponseCode.Not_Found
        ctx.body = Response.NoComic()
        return
      }
      await ComicModel.updateOne({ _id: comicId }, { $inc: { favoriteCount: -1 } })
      ctx.response.status = ResponseCode.OK
      ctx.body = Response.Success()
    } catch (error) {
      console.error(error)
      Response.UnknownError(error as Error)
    }
  }

  public async getFavoriteComics(ctx: Context) {
    try {
      const userId = ctx.state.userId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        ctx.body = Response.InValidId()
        return
      }
      const favorites = await Favorite.find({ userId }).populate('comicId')
      const favoriteComics = favorites.map((favorite) => favorite.comicId as unknown as IComic)

      ctx.body = Response.Success<IComic[]>({ data: favoriteComics })
    } catch (error) {
      console.error(error)
      Response.UnknownError(error as Error)
    }
  }

  public async getFavoriteComic(ctx: Context) {
    try {
      const userId = ctx.state.userId
      const { id: comicId } = ctx.params
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(comicId)) {
        ctx.body = Response.InValidId()
        return
      }
      const favorite = await Favorite.findOne({ userId, comicId })

      if (favorite) {
        ctx.body = Response.Success<Boolean>({ data: true })
        return
      }
      ctx.body = Response.Success<Boolean>({ data: false })
    } catch (error) {
      console.error(error)
      Response.UnknownError(error as Error)
    }
  }

  public async getSearchComics(ctx: Context) {
    try {
      const { keyword } = ctx.query
      console.log(keyword)
      if (!keyword) {
        ctx.body = Response.Success<IComic[]>({ data: [] })
        return
      }
      const searchComics = await ComicModel.find({ name: { $regex: keyword, $options: 'i' } })
      ctx.body = Response.Success<IComic[]>({ data: searchComics })
    } catch (error) {
      console.error(error)
      Response.UnknownError(error as Error)
    }
  }

  public async createComic(ctx: Context) {
    try {
      const { name, author, status, tags, description } = ctx.request['body']
      const comic = await ComicModel.create({ name, author, status, tags, description })
      console.log(comic)
      ctx.body = Response.Success()
    } catch (error) {
      console.error(error)
      Response.UnknownError(error as Error)
    }
  }

  public async updateComic(ctx: Context) {
    try {
      const { field, newVal } = ctx.request['body']
      const { id } = ctx.params
      if (!mongoose.Types.ObjectId.isValid(id)) {
        ctx.body = Response.InValidId()
        return
      }
      await ComicModel.updateOne({ _id: id }, { [field]: newVal })
      ctx.body = Response.Success()
    } catch (error) {
      console.error(error)
      ctx.body = Response.UnknownError(error as Error)
    }
  }

  public async createComicChapter(ctx: Context) {
    try {
      await ComicChapterModel.create({
        comicId: ctx.params.id,
        chapter: ctx.params.chapter,
        pages: (ctx.files as multer.File[]).length
      })
      const comicId = ctx.params.id
      const chapter = ctx.params.chapter
      fs.mkdirSync(`./app/public/${comicId}/${chapter}`, { recursive: true })
      const directoryPath = path.resolve(__dirname, '../', `public/${comicId}/${chapter}`)
      ;(ctx.files as multer.File[]).forEach((file: multer.File, index: number) => {
        const filename = `${index + 1}.webp`
        const filePath = path.join(directoryPath, filename)
        sharp(file.buffer)
          .webp({ quality: 80 })
          .toFile(filePath, (err) => {
            console.log(err)
          })
      })
      ctx.body = Response.Success()
    } catch (error) {
      console.error(error)
      Response.UnknownError(error as Error)
    }
  }
}

export default new ComicController()

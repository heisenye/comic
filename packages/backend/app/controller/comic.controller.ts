import * as fs from 'fs'
import * as path from 'path'
import { Context } from 'koa'
import multer = require('@koa/multer')
import mongoose from 'mongoose'
import Comic, { IComic } from '../model/comic.model'
import ComicChapterModel, { IComicChapter } from '../model/comicChapter.model'
import Favorite from '../model/favorite.model'
import Comment from '../model/comment.model'
import Response from '../utils/response'
import { ResponseCode } from '../constants/status'
import sharp = require('sharp')
import logger from '../logger'
import message from '../constants/message'

class ComicController {
  public async getComics(ctx: Context) {
    const comics = await Comic.find({})
    ctx.response.status = ResponseCode.OK
    ctx.body = Response.Success<IComic[]>({ data: comics })
  }

  public async getComic(ctx: Context) {
    const { id } = ctx.params
    const comic = await Comic.findById(id)
    if (!comic) {
      ctx.body = Response.Success({})
      return
    }
    ctx.body = Response.Success<IComic>({ data: comic })
  }

  public async createComic(ctx: Context) {
    const { name, author, status, tags, description } = ctx.request['body']
    await Comic.create({ name, author, status, tags, description })
    ctx.body = Response.Success()
  }

  public async updateComic(ctx: Context) {
    const { field, newVal } = ctx.request['body']
    const { id } = ctx.params
    await Comic.updateOne({ _id: id }, { [field]: newVal })
    ctx.body = Response.Success()
  }

  public async removeComic(ctx: Context) {
    const { id } = ctx.params
    const result = await Comic.deleteOne({_id: id})
    if (result.deletedCount === 0) {
      ctx.response.status = ResponseCode.Not_Found
      ctx.body = Response.NoComic()
      return
    }
    ctx.body = Response.Success()
  }

  public async getComicImages(ctx: Context) {
    const { id, chapter } = ctx.params
    const comicImages = await ComicChapterModel.findOne({ comicId: id, chapter: Number(chapter) })
    if (!comicImages) {
      ctx.response.status = ResponseCode.Not_Found
      ctx.body = Response.NoComic()
      return
    }
    ctx.body = Response.Success<IComicChapter>({ data: comicImages })
  }

  public async getHistoryComics(ctx: Context) {
    const ids = ctx.query.id
    if (!ids) {
      ctx.body = Response.Success({ data: [] })
      return
    }
    if (typeof ids === 'string') {
      const historyComic = await Comic.findById(ids)
      if (!historyComic) {
        ctx.response.status = ResponseCode.Not_Found
        ctx.body = Response.NoComic()
        return
      }
      ctx.response.status = ResponseCode.OK
      ctx.body = Response.Success<IComic[]>({ data: [historyComic] })
      return
    }
    const historyComics = await Comic.find({ _id: { $in: ids } })
    ctx.body = Response.Success<IComic[]>({ data: historyComics })
  }

  public async createFavoriteComic(ctx: Context) {
    const userId = ctx.state.userId
    const { id: comicId } = ctx.request['body']
    await Favorite.create({ userId, comicId })
    ctx.response.status = ResponseCode.OK
    ctx.body = Response.Success({})
  }

  public async deleteFavoriteComic(ctx: Context) {
    const userId = ctx.state.userId
    const { id: comicId } = ctx.params
    const deleteResult = await Favorite.deleteOne({
      userId,
      comicId
    })
    if (deleteResult.deletedCount === 0) {
      ctx.response.status = ResponseCode.Not_Found
      ctx.body = Response.NoComic()
      return
    }
    await Comic.updateOne({ _id: comicId }, { $inc: { favoriteCount: -1 } })
    ctx.body = Response.Success()
  }

  public async getFavoriteComics(ctx: Context) {
    const userId = ctx.state.userId
    const favorites = await Favorite.find({ userId }).populate('comicId')
    const favoriteComics = favorites.map((favorite) => favorite.comicId as unknown as IComic)
    ctx.body = Response.Success<IComic[]>({ data: favoriteComics })
  }

  public async getFavoriteComic(ctx: Context) {
    const userId = ctx.state.userId
    const { id: comicId } = ctx.params
    const favorite = await Favorite.findOne({ userId, comicId })
    if (favorite) {
      ctx.body = Response.Success<Boolean>({ data: true })
      return
    }
    ctx.body = Response.Success<Boolean>({ data: false })
  }

  public async getSearchComics(ctx: Context) {
    const { keyword } = ctx.query
    if (!keyword) {
      ctx.body = Response.Success<IComic[]>({ data: [] })
      return
    }
    const searchComics = await Comic.find({ name: { $regex: keyword, $options: 'i' } })
    ctx.body = Response.Success<IComic[]>({ data: searchComics })
  }

  public async createComicChapter(ctx: Context) {
    const { comicId, chapter } = ctx.params
    await ComicChapterModel.create({
      comicId,
      chapter,
      pages: (ctx.files as multer.File[]).length
    })
    fs.mkdirSync(`./app/public/${comicId}/${chapter}`, { recursive: true })
    const directoryPath = path.resolve(__dirname, '../', `public/${comicId}/${chapter}`)
    ;(ctx.files as multer.File[]).forEach((file: multer.File, index: number) => {
      const filename = `${index + 1}.webp`
      const filePath = path.join(directoryPath, filename)
      sharp(file.buffer)
        .webp({ quality: 80 })
        .toFile(filePath, (err) => {
          if (err) {
            logger.error(err)
          }
        })
    })
    ctx.body = Response.Success()
  }

  public async setComicCover(ctx: Context) {
    const { id } = ctx.params
    const { chapter, page } = ctx.request['body']
    const comic = await Comic.findById(id)
    if (!comic) {
      ctx.response.status = ResponseCode.Not_Found
      ctx.body = Response.NoComic()
      return
    }
    await comic.updateOne({ coverImage: { chapter, page } })
    ctx.response.status = ResponseCode.OK
    ctx.body = Response.Success()
  }

  public async getComicComments(ctx: Context) {
    const { id: comicId } = ctx.params
    const comments = await Comment.find({ comicId }).populate({
      path: 'userId',
      select: 'username'
    })
    ctx.body = Response.Success({ data: comments })
  }

  public async createComicComment(ctx: Context) {
    const userId = ctx.state.userId
    const { id: comicId } = ctx.params
    const { content } = ctx.request['body']
    await Comment.create({ comicId, userId, content })
    ctx.body = Response.Success()
  }
}

export default new ComicController()

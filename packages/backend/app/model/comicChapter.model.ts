import { Schema, model, Document, Error } from 'mongoose'
import Comic from './comic.model'

export interface IComicChapter extends Document {
  comicId: string
  chapter: number
  pages: number
}

const comicChapterSchema = new Schema({
  comicId: {
    type: Schema.Types.ObjectId
  },
  chapter: Number,
  pages: Number
})

comicChapterSchema.pre('save', async function (next) {
  try {
    const comicChapter = this
    await Comic.updateOne(
      { _id: comicChapter.comicId },
      { $inc: { chapters: 1 }, $set: { updatedAt: new Date() } }
    ).exec()
    next()
  } catch (error) {
    next(error as Error)
  }
})

const ComicChapterModel = model<IComicChapter>('ComicChapter', comicChapterSchema)

export default ComicChapterModel

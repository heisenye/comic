import { Schema, model, Document, Model } from 'mongoose'
import comic from './comic.model'

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
  const comicChapter = this
  await comic
    .updateOne(
      { _id: comicChapter.comicId },
      { $inc: { chapters: 1 }, $set: { updatedAt: new Date() } }
    )
    .exec()
  next()
})

const ComicChapterModel: Model<IComicChapter> = model<IComicChapter>(
  'ComicChapter',
  comicChapterSchema
)

export default ComicChapterModel

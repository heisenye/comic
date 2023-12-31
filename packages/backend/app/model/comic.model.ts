import { Schema, model} from 'mongoose'

export interface IComic extends Document {
  name: string
  author: string
  status: string
  tags: string[]
  description: string
  chapters: number
  otherInfo: string[]
  otherNames: string[]
  viewCount: number
  favoriteCount: number
  coverImage: {
    chapter: number
    page: number
  }
  createdAt: Date
  updatedAt: Date
}

const ComicSchema = new Schema({
  name: { type: String },
  otherNames: [String],
  author: String,
  chapters: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed']
  },
  tags: [String],
  viewCount: {
    type: Number,
    default: 0
  },
  favoriteCount: {
    type: Number,
    default: 0
  },
  coverImage: {
    chapter: {
      type: Number,
      default: 1
    },
    page: {
      type: Number,
      default: 1
    }
  },
  description: String,
  otherInfo: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

const Comic = model<IComic>('Comic', ComicSchema)

export default Comic

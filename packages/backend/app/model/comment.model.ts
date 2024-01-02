import { model, Schema, Types } from 'mongoose'

export interface IComment extends Document {
  content: string
  userId: Types.ObjectId
  comicId: Types.ObjectId
  replies: Types.ObjectId[]
  likes: number
  createdAt: Date | string
  updatedAt: Date | string
}

const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    comicId: { type: Types.ObjectId, ref: 'Comic', required: true },
    replies: [{ type: Types.ObjectId, ref: 'Comment' }],
    likes: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
)

const Comment = model<IComment>('Comment', CommentSchema)

export default Comment

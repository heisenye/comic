import { Schema, Types, model } from 'mongoose'

export interface IFavorite extends Document {
  userId: Types.ObjectId
  comicId: Types.ObjectId
}

const FavoriteSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    comicId: { type: Types.ObjectId, ref: 'Comic', required: true }
  },
  { timestamps: true }
)

export default model<IFavorite>('Favorite', FavoriteSchema)

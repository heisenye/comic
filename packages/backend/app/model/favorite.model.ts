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

const Favorite = model<IFavorite>('Favorite', FavoriteSchema)

export default Favorite
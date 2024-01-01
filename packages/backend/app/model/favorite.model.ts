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

FavoriteSchema.pre('save', async function (next) {
  try {
    const favorite = this
    const id = favorite.comicId
    const Comic = model('Comic')
    await Comic.updateOne({ _id: id }, { $inc: { favoriteCount: 1 } })
    next()
  } catch (error) {
    next(error as Error)
  }
})

const Favorite = model<IFavorite>('Favorite', FavoriteSchema)

export default Favorite

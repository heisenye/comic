import {Schema, Types, model} from 'mongoose'

export interface IView extends Document {
  userId: Types.ObjectId
  comicId: Types.ObjectId
}

const ViewSchema = new Schema(
  {
    userId: {type: Types.ObjectId, ref: 'User', required: true},
    comicId: {type: Types.ObjectId, ref: 'Comic', required: true}
  }
)

export default model<IView>('View', ViewSchema)
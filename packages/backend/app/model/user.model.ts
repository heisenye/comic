import { Schema, model, Document } from 'mongoose'
import { scryptSync, randomBytes } from 'crypto'

export interface IUser extends Document {
  username: string
  password: string
  createdAt: Date | string
}

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      set(val: string): string {
        const salt = randomBytes(8).toString('hex')
        const hash = scryptSync(val, salt, 64).toString('hex')
        return `${salt}:${hash}`
      }
    }
  },
  { timestamps: true }
)

export default model<IUser>('User', UserSchema)

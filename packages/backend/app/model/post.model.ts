import { Schema, model, Document, Model } from 'mongoose'

export interface IPost extends Document {
  title: string
  content: string
  createdAt: Date | string
  updatedAt: Date | string
}

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

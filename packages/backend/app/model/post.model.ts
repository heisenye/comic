import { Schema, model, Document, Model } from 'mongoose'

export interface IPost extends Document {
  title: string
  content: string
  createdAt: Date | string
  updatedAt: Date | string
}

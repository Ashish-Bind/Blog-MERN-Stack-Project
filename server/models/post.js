import mongoose, { Schema } from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    content: String,
    coverImage: String,
    author: { type: Schema.Types.ObjectId, ref: 'user' },
  },
  { timestamps: true }
)

export const postModel = mongoose.model('post', postSchema)

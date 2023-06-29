import mongoose, { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true },
})

export const userModel = model('user', userSchema)

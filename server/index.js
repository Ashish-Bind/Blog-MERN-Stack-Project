import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { userModel } from './models/user.js'
import { postModel } from './models/post.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()
const __dirname = path.resolve()

const uploadMiddleware = multer({ dest: 'uploads' })

const salt = bcrypt.genSaltSync(10)
const secret = `dSuye38ad8y3r82v4chfw8r48r`

const app = express()
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to database'))

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await userModel.findOne({
    username,
  })
  const passOk = bcrypt.compareSync(password, user.password)
  if (passOk) {
    // logged in
    jwt.sign({ username, id: user._id }, secret, {}, (err, token) => {
      if (err) throw err
      res.cookie('token', token).json({ id: user._id, username })
    })
  } else {
    // not logged in
    res.status(400).json(`wrong credentials`)
  }
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await userModel.create({
      username,
      password: bcrypt.hashSync(password, salt),
    })
    res.json(user)
  } catch (e) {
    res.status(400).json(e)
  }
})

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok')
})

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  const { title, summary, content } = req.body
  const { originalname, path } = req.file
  const parts = originalname.split('.')
  const ext = parts[parts.length - 1]
  const newPath = `${path}.${ext}`
  fs.renameSync(path, newPath)
  const { token } = req.cookies
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err
    const postDoc = await postModel.create({
      title,
      summary,
      content,
      coverImage: newPath,
      author: info.id,
    })
    res.json(postDoc)
  })
})

app.get('/post', async (req, res) => {
  res.json(
    await postModel
      .find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(20)
  )
})

app.get('/post/:id', async (req, res) => {
  const { id } = req.params
  const postDoc = await postModel.findById(id).populate('author', ['username'])
  res.json(postDoc)
})

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
  let newPath = null
  if (req.file) {
    const { originalname, path } = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    newPath = `${path}.${ext}`
    fs.renameSync(path, newPath)
  }

  const { token } = req.cookies
  const { id, title, summary, content } = req.body

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err
    console.log(info)
    const postDoc = await postModel.findById(id)
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)
    if (!isAuthor) {
      return res.status(400).json(`Incorrect Author`)
    }

    const updatedPostDoc = await postModel.findByIdAndUpdate(postDoc._id, {
      title,
      summary,
      content,
      coverImage: newPath || postDoc.coverImage,
    })
    res.json(updatedPostDoc)
  })
})

app.get('/profile', (req, res) => {
  const { token } = req.cookies
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err
    res.json(info)
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}/`)
})

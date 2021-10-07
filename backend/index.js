import app from './app.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
const port = process.env.PORT || 5000

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.upzs8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
)

app.listen(port, () => {
  console.log(`listening on port ${port}...`)
})
import express from 'express'
import cors from 'cors'

import tutorialRoutes from './api/routes/tutorial-routes.js'
import userRoutes from './api/routes/user-routes.js'

const app = express()

// Handle body parser and cors
app.use(cors())
app.use(express.json())

// Routes handling
app.use('/api/v1/', userRoutes)
app.use('/api/v1/tutorials', tutorialRoutes)

// Error handling
app.use('*', (req, res, next) => {
  const error = new Error('Not Found!')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

export default app

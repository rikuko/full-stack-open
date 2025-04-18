const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const blogsRouter = require('./controllers/blogs_routes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
/* const cors = require('cors'); */

mongoose.set('strictQuery', false)
logger.info('Connecting to MongoDB...')

mongoose.connect(config.MONGO_URI)
  .then(() => {
    logger.info('Connection to MongoDB successful')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
  })



// Middleware
/* app.use(cors()); */
app.use(express.json())
app.use(express.static('dist'))
app.use(middleware.requestLogger)

// Routes
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app




const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const morgan = require('morgan')

const app = express()

logger.info('Connecting to database')
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to DB successfully')
  })
  .catch(error => {
    logger.error(
      'Error connecting to DB:',
      error.message
    )
  })
  
app.use(express.json())  
app.use(morgan('tiny'))
  
module.exports = app
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const morgan = require('morgan')
const childRouter = require('./controllers/children')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const jwt = require('jsonwebtoken')
const User = require('./models/User')

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

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    const retrievedToken = authorization.replace('Bearer ', '')
    req.token = retrievedToken
  }
  next()
}

const userExtractor = async (req, res, next) => {
  if (!req.token) {
    return next()
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({
      message: 'Invalid token'
    })
  }
  const user = await User.findById(decodedToken.id)
  if (!user) {
    return res.status(400).json({
      message: 'UserId missing or invalid'
    })
  }
  req.user = user
  next()
}
  
app.use(express.json())  
app.use(morgan('tiny'))
app.use(tokenExtractor)
app.use('/api/login', loginRouter)
app.use('/api/children', userExtractor, childRouter)
app.use('/api/users', userRouter)
  
module.exports = app
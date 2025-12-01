const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

userRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({})
      .populate('children', {
        name: 1,
        nickname: 1
      })
    res.json(users)
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

userRouter.post('/', async (req, res) => {
  try {
    const { username, name, password } = req.body

    if ( !password || password.length < 6) {
      return res.status(400).json({
        message: "minimum password length is 6 characters"
      })
    }
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      passwordHash,
      name
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'minimum length of username must be 3'
      }) 
    } else if (error.name === 'MongoServerError' 
        && error.message
        .includes('E11000 duplicate key error')) {
      return res.status(400).json({
        message: 'username already taken'
      })
    } else {
      return res.status(500).json({
        error: error.message
      })
    }
  }
})
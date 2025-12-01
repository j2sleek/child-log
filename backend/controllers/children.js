const childRouter = require('express').Router()
const Child = require('../models/Child')
const User = require('../models/User')

childRouter.get('/', async (req, res) => {
  const children = await Child.find({}).populate('users', 'name')

  res.status(200).json(children)
})

childRouter.post('/', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }

    const user = req.user
    const child = new Child({...req.body})
    child.users = child.users.concat(user._id)
    const response = await child.save()

    user.children = user.children.concat(response._id)

    return res.status(201).json(child)
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
})

childRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const child = await Child.findById(id)
      .populate('diapers')
      .populate('meals')
      .populate('moods')
      .populate('sleeps')

    res.status(200).json(child)
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
})
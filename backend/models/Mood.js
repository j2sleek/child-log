const mongoose = require('mongoose')

const moodSchema = new mongoose.Schema({
 status: {
  type: String,
  enum: ['happy', 'normal', 'sad'],
  default: 'normal'
 },
 time: Date,
 description: String,
 child: {
  type: mongoose.Schema.ObjectId,
  ref: 'Child'
 }
})

moodSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
    delete returnedObject._id
  }
})

const Mood = mongoose.model('Mood', moodSchema)

module.exports = Mood
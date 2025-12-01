const mongoose = require('mongoose')

const moodSchema = new mongoose.Schema({
 status: String,
 time: Date,
 description: String, 
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
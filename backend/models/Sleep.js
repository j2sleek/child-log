const mongoose = require('mongoose')

const sleepSchema = mongoose.Schema({
  start_time: Date,
  end_time: Date
})

sleepSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Sleep = mongoose.model('Sleep', sleepSchema)

module.exports = Sleep
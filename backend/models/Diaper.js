const mongoose = require('mongoose')

const diaperSchema = new mongoose.Schema({
 time: {
   type: Date,
   default: Date.now
 }
 reason: {
   type: String,
   enum: ['pee', 'poop'],
   default: 'pee'
 },
 info: String
})

diaperSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Diaper = mongoose.model('Diaper', diaperSchema)

module.exports = Diaper
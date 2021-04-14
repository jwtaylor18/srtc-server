const mongoose = require('mongoose')

const ReservationSchema = new mongoose.Schema({

  facility: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'facility'
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  date: {
    type: Date
  },
  time: {
    type: String
  },

  //Temporary solution for ordering the times of the day
  timeslotOrder: {
    type: Number
  },

  cost: {
    type: Number
  },

  isBooked: {
    type: Boolean,
    default: false
  }
})

module.exports = Reservation = mongoose.model('reservation', ReservationSchema)
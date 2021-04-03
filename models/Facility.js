const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FacilitySchema = new Schema ({
  operator: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },

  facilityName: {
    type: String,
    required: true
  },

  courtSurface: {
    type: String,
    required: true
  },

  numCourts: {
    type: Number,
    required: true
  },

  emailAddress: {
    type: String,
    required: true
  },

  phone: {
    type: String, 
    required: true
  },

  streetAddress: {
    type: String,
    required: true
  },

  city: {
    type: String,
    required: true
  },

  state: {
    type: String,
    required: true
  },

  zipCode: {
    type: String,
    required: true
  },

  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Post = mongoose.model('facility', FacilitySchema)
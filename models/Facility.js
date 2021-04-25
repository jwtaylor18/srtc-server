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

  imageURL: {
    type: String,
    default: "https://images.unsplash.com/photo-1547934045-2942d193cb49?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVubmlzJTIwY291cnR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
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
  },

  latitude: {
    type: Number,
    default: 42.34269223912957
  },

  longitude: {
    type: Number,
    default: -71.03346364098043
  }
})

module.exports = Post = mongoose.model('facility', FacilitySchema)
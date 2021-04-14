const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const Reservation = require('../../models/Reservation')
const Facility = require('../../models/Facility')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route POST api/reservations
// @desc Create a new reservation that is available to be booked
// @access Private
router.post('/', auth, async (req, res) => {
  
  try {

    const newReservation = new Reservation({
      facility: req.body.facilityId,
      date: req.body.date,
      time: req.body.time,
      timeslotOrder: req.body.timeslotOrder,
      cost: req.body.cost
    })

    const reservation = await newReservation.save()
    res.json(reservation)

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error in reservations route')
  }
  
})


// @route GET api/reservations/open-slots
// @desc Get all open slots that are available for booking
// @access Private
router.get('/open-slots', auth, async (req, res) => {
  try {
    //Gets the facilities, sort by date with most recent first
    const openSlots = await Reservation.find({isBooked: false})
    res.json(openSlots)
  } catch(err) {
    res.status(500).send("Server error in get open reservations")
  }
})

module.exports = router
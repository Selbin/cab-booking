const express = require('express')
const router = express.Router()
const tripController = require('../controller/tripController')

router.post('/book/:lat/:lon/:userId/:color', tripController.bookCab)
router.post('/endTrip/:tripId/:endLat/:endLon', tripController.endTrip)

module.exports = router

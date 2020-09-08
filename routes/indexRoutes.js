const express = require('express')
const router = express.Router()
const tripController = require('../controller/tripController')

router.get('/book/:lat/:lon/:userId/:color', tripController.bookCab)
router.put('/endTrip/:tripId/:endLat/:endLon', tripController.endTrip)

module.exports = router

const express = require('express')
const router = express.Router()
const tripController = require('../controller/tripController')

router.post('/book', tripController.bookCab)
router.post('/endTrip', tripController.endTrip)

module.exports = router

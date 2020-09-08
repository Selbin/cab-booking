const express = require('express')
const router = express.Router()
const tripController = require('../controller/tripController')

router.get('/book/:lat/:lon/:userId/:color', tripController.bookCab)

module.exports = router

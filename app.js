const express = require('express')
const dotEnv = require('dotenv')
const indexRoutes = require('./routes/indexRoutes')

dotEnv.config()

const app = express()

app.use(express.json())

app.use('/fuber', indexRoutes)

app.listen(process.env.APP_PORT, () => console.log('listening to: ', process.env.APP_PORT))

module.exports = app

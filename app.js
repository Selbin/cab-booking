const express = require('express')
const dotEnv = require('dotenv')

dotEnv.config()

const app = express()

app.use(express.json())

app.listen(process.env.APP_PORT, () => console.log('listening to: ', process.env.APP_PORT))

module.exports = app

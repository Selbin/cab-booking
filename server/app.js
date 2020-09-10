const express = require('express')
const dotEnv = require('dotenv')
const { exeQuery } = require('./database/database')
const indexRoutes = require('./routes/indexRoutes')
const cors = require('cors')

dotEnv.config()

const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(cors()) // to allow cross origin request

io.on('connection', async socket => {
  const getAvailableCabs = 'select * from cabs where available = $1'
  const result = await exeQuery(getAvailableCabs, [true])
  io.emit('list vehicle', result.rows)
})

const setSocket = (req, res, next) => { // to set socket io to req object
  req.io = io
  next()
}

app.use(setSocket)

app.use('/fuber', indexRoutes)

http.listen(process.env.APP_PORT, () =>
  console.log('listening to: ', process.env.APP_PORT)
)

module.exports = app

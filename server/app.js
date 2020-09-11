const express = require('express')
const dotEnv = require('dotenv')
const cors = require('cors')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const { exeQuery } = require('./database/database')
const indexRoutes = require('./routes/indexRoutes')

dotEnv.config()
app.use(cors()) // to allow cross origin request
app.use(express.json())

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

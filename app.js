const express = require('express')
const dotEnv = require('dotenv')
const { exeQuery } = require('./database/database')
const indexRoutes = require('./routes/indexRoutes')
const cors = require('cors')

dotEnv.config()

const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(cors())

io.on('connection', async socket => {
  const query = 'select * from cabs where available = $1'
  const result = await exeQuery(query, [true])
  io.emit('list vehicle', result.rows)
})

app.use('/fuber', indexRoutes)

http.listen(process.env.APP_PORT, () =>
  console.log('listening to: ', process.env.APP_PORT)
)

module.exports = app

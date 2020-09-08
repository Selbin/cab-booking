const { exeQuery } = require('../database/database')
const {
  calculateDistance,
  findNearestCab,
  setResponseObj
} = require('../helper/helper')

const bookCab = async (req, res) => {
  const { lat, lon, color, userId } = req.params
  let str = ''
  const value1 = [true]
  if (color === 'pink') {
    str = 'and color = $2'
    value1.push('pink')
  }
  const query1 = 'select * from cabs where available = $1 ' + str
  const query2 = 'update cabs set available = $1 where cab_id = $2'
  const query3 = 'insert into trip(cab_id, user_id, lat, lon, end_lat, end_lon, cost) values ($1, $2, $3, $4, $5, $6, $7) returning trip_id'
  try {
    let result = await exeQuery(query1, value1)
    if (!result.rowCount) return res.status(400).json(setResponseObj(false, null, 'Cab unavailable. Please try again later'))
    let cabObj = {
      cabInfo: result.rows[0],
      distance: calculateDistance(
        lat,
        lon,
        result.rows[0].lat,
        result.rows[0].lon
      )
    }
    for (let i = 1; i < result.rowCount; i++) {
      const distance = calculateDistance(
        lat,
        lon,
        result.rows[i].lat,
        result.rows[i].lon
      )
      cabObj = findNearestCab(cabObj, distance, result.rows[i])
    }
    if (cabObj.cabInfo.cab_id) {
      await exeQuery(query2, [false, cabObj.cabInfo.cab_id])
      result = await exeQuery(query3, [cabObj.cabInfo.cab_id, userId, lat, lon, 0, 0, 0])
      cabObj.tripId = result.rows[0].trip_id
    }
    res.status(200).json(setResponseObj(true, cabObj, 'Booking successful'))
  } catch (error) {
    console.log(error)
    res.status(500).json(setResponseObj(false, null, 'Internal server error'))
  }
}

module.exports = { bookCab }

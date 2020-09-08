const { exeQuery } = require('../database/database')
const {
  calculateDistance,
  findNearestCab,
  setResponseObj,
  calculateCost
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
  const query3 =
    'insert into trip(cab_id, user_id, lat, lon, start_time, end_time, end_lat, end_lon, cost) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning trip_id'
  try {
    let result = await exeQuery(query1, value1)
    if (!result.rowCount) {
      return res
        .status(404)
        .json(
          setResponseObj(false, null, 'Cab unavailable. Please try again later')
        )
    }
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
      result = await exeQuery(query3, [
        cabObj.cabInfo.cab_id,
        userId,
        lat,
        lon,
        new Date(),
        new Date(),
        0,
        0,
        0
      ])
      cabObj.tripId = result.rows[0].trip_id
    }
    res.status(200).json(setResponseObj(true, cabObj, 'Booking successful'))
  } catch (error) {
    console.log(error)
    res.status(500).json(setResponseObj(false, null, 'Internal server error'))
  }
}

const endTrip = async (req, res) => {
  const { endLat, endLon, tripId } = req.params
  const query1 =
    'select trip.*, cabs.color from trip inner join cabs on cabs.cab_id = trip.cab_id where trip_id = $1 and cost = $2'
  const query2 = 'update cabs set available = $1, lat = $3, lon= $4 where cab_id = $2'
  const query3 = 'update trip set end_lat =$1, end_lon=$2, end_time=$3, cost=$4 where trip_id = $5 returning *'
  try {
    let result = await exeQuery(query1, [tripId, 0])
    if (!result.rowCount) {
      return res.status(404).json(setResponseObj(false, null, 'Trip not found'))
    }
    await exeQuery(query2, [true, result.rows[0].cab_id, endLat, endLon])
    const distanceTravelled = calculateDistance(
      endLat,
      endLon,
      result.rows[0].lat,
      result.rows[0].lon
    )
    const travelCost = calculateCost(distanceTravelled, result.rows[0].start_time, new Date(), result.rows[0].color)
    await exeQuery(query2, [true, result.rows[0].cab_id])
    result = await exeQuery(query3, [endLat, endLon, new Date(), travelCost, tripId])
    res.status(200).json(setResponseObj(true, result.rows[0], 'Trip completed'))
  } catch (error) {
    console.log(error)
    res.status(500).json(setResponseObj(false, null, 'Internal server error'))
  }
}

module.exports = { bookCab, endTrip }

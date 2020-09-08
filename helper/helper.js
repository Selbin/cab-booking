// used for calculating distance between two co-ordinates
const calculateDistance = (x1, y1, x2, y2) => {
  x1 = x1 * (Math.PI / 180) // for converting degree to radian
  y1 = y1 * (Math.PI / 180)
  x2 = x2 * (Math.PI / 180)
  y2 = y2 * (Math.PI / 180)
  return (Math.sqrt(Math.pow(Math.abs(x2 - x1), 2) + Math.pow(Math.abs(y2 - y1), 2))) * 6371
}

// Used for finding the nearest cab between current cab object & new cab
const findNearestCab = (currentCabObj, newDistance, newCab) =>
  currentCabObj.distance > newDistance ? { cabInfo: newCab, distance: newDistance } : currentCabObj

// Used for setting response object
const setResponseObj = (success, data, message) => {
  return { success, data, message }
}

module.exports = { calculateDistance, findNearestCab, setResponseObj }

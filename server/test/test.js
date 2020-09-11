const request = require('supertest')
const expect = require('expect')
const { describe, it } = require('mocha')

const app = require('../app')
const {
  calculateCost,
  calculateDistance,
  findNearestCab,
  setResponseObj
} = require('../helper/helper')

const cabObj = {
  cabInfo: {
    cab_id: 4,
    lat: '10.507012',
    lon: '76.240067',
    color: 'pink',
    car_no: '323',
    available: true
  },
  distance: 0.19378120787734163
}
const newDistance = 0.8480081531673553
const newCabObj = {
  cab_id: 4,
  lat: '10.497702',
  lon: '76.239472',
  color: 'pink',
  car_no: '323',
  available: true
}
const responseObj = {
  success: true,
  data: newCabObj,
  message: 'Booking successful'
}
const bookCabBody = {
  lat: 10.486819,
  lon: 76.252764,
  userId: 1,
  color: 'noprefs'
}
let result

describe('POST /fuber/book', () => {
  it('responds with json containing booked cab data', done => {
    request(app)
      .post('/fuber/book')
      .send(bookCabBody)
      .expect(200)
      .expect(res => {
        result = res.body
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        done()
      })
  })
})

describe('post /fuber/endTrip', () => {
  it('responds with json containing trip data', done => {
    request(app)
      .post('/fuber/endTrip')
      .send({
        endLat: 10.518573,
        endLon: 76.259432,
        tripId: result.data.tripId
      })
      .expect(200)
      .expect(res => {
        expect(res.body.success).toBe(true)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        done()
      })
  })
})

describe('Testing calculateDistance()', () => {
  it('returns distance between two coordinates', done => {
    expect(calculateDistance(10.505284, 76.240293, 10.50075, 76.239696)).toBe(
      0.5085094263220941
    )
    done()
  })
})

describe('Testing calculateCost()', () => {
  it('returns with cost of the trip', done => {
    expect(calculateCost(34, new Date(), new Date(), 'pink')).toBe(73)
    done()
  })
})

describe('Testing findNearestCab()', () => {
  it('returns with nearest cab object', done => {
    expect(JSON.stringify(findNearestCab(cabObj, newDistance, newCabObj))).toBe(
      JSON.stringify(cabObj)
    )
    done()
  })
})

describe('Testing setResponseOBj()', () => {
  it('returns with nearest cab object', done => {
    expect(
      JSON.stringify(setResponseObj(true, newCabObj, 'Booking successful'))
    ).toBe(JSON.stringify(responseObj))
    done()
  })
})

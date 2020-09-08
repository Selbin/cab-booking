const request = require('supertest')
const expect = require('expect')
const { describe, it } = require('mocha')
const app = require('../app')
let result = ''
describe('GET /fuber/book/:lat/:lon/:userId/:color', () => {
  it('responds with json containing booked cab data', done => {
    request(app)
      .get('/fuber/book/10.505284/76.240293/1/pink')
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

describe('post /fuber/endTrip/:tripId/:endLat/:endLon', () => {
  it('responds with json containing trip data', done => {
    request(app)
      .post(`/fuber/endTrip/${result.data.tripId}/10.497702/76.239472`)
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

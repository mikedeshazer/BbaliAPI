import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Ride } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, ride

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  ride = await Ride.create({ userId: user })
})

test('POST /rides 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ userAuth: userSession, timeStarted: 'test', type: 'test', duration: 'test', ratePerUnitTime: 'test', currency: 'test', timeEnded: 'test', paymentMethodID: 'test', status: 'test', rideTotal: 'test', locationPickupLon: 'test', locationPickupLat: 'test', locationdropOffLon: 'test', locationDropoffLat: 'test', loctionDropoffAddress: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.timeStarted).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.duration).toEqual('test')
  expect(body.ratePerUnitTime).toEqual('test')
  expect(body.currency).toEqual('test')
  expect(body.timeEnded).toEqual('test')
  expect(body.paymentMethodID).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.rideTotal).toEqual('test')
  expect(body.locationPickupLon).toEqual('test')
  expect(body.locationPickupLat).toEqual('test')
  expect(body.locationdropOffLon).toEqual('test')
  expect(body.locationDropoffLat).toEqual('test')
  expect(body.loctionDropoffAddress).toEqual('test')
  expect(typeof body.userId).toEqual('object')
})

test('POST /rides 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /rides 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ userAuth: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].userId).toEqual('object')
})

test('GET /rides 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /rides/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${ride.id}`)
    .query({ userAuth: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(ride.id)
  expect(typeof body.userId).toEqual('object')
})

test('GET /rides/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${ride.id}`)
  expect(status).toBe(401)
})

test('GET /rides/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ userAuth: userSession })
  expect(status).toBe(404)
})

test('PUT /rides/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${ride.id}`)
    .send({ userAuth: userSession, timeStarted: 'test', type: 'test', duration: 'test', ratePerUnitTime: 'test', currency: 'test', timeEnded: 'test', paymentMethodID: 'test', status: 'test', rideTotal: 'test', locationPickupLon: 'test', locationPickupLat: 'test', locationdropOffLon: 'test', locationDropoffLat: 'test', loctionDropoffAddress: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(ride.id)
  expect(body.timeStarted).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.duration).toEqual('test')
  expect(body.ratePerUnitTime).toEqual('test')
  expect(body.currency).toEqual('test')
  expect(body.timeEnded).toEqual('test')
  expect(body.paymentMethodID).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.rideTotal).toEqual('test')
  expect(body.locationPickupLon).toEqual('test')
  expect(body.locationPickupLat).toEqual('test')
  expect(body.locationdropOffLon).toEqual('test')
  expect(body.locationDropoffLat).toEqual('test')
  expect(body.loctionDropoffAddress).toEqual('test')
  expect(typeof body.userId).toEqual('object')
})

test('PUT /rides/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${ride.id}`)
    .send({ userAuth: anotherSession, timeStarted: 'test', type: 'test', duration: 'test', ratePerUnitTime: 'test', currency: 'test', timeEnded: 'test', paymentMethodID: 'test', status: 'test', rideTotal: 'test', locationPickupLon: 'test', locationPickupLat: 'test', locationdropOffLon: 'test', locationDropoffLat: 'test', loctionDropoffAddress: 'test' })
  expect(status).toBe(401)
})

test('PUT /rides/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${ride.id}`)
  expect(status).toBe(401)
})

test('PUT /rides/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ userAuth: anotherSession, timeStarted: 'test', type: 'test', duration: 'test', ratePerUnitTime: 'test', currency: 'test', timeEnded: 'test', paymentMethodID: 'test', status: 'test', rideTotal: 'test', locationPickupLon: 'test', locationPickupLat: 'test', locationdropOffLon: 'test', locationDropoffLat: 'test', loctionDropoffAddress: 'test' })
  expect(status).toBe(404)
})

test('DELETE /rides/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${ride.id}`)
    .query({ userAuth: userSession })
  expect(status).toBe(204)
})

test('DELETE /rides/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${ride.id}`)
    .send({ userAuth: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /rides/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${ride.id}`)
  expect(status).toBe(401)
})

test('DELETE /rides/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ userAuth: anotherSession })
  expect(status).toBe(404)
})

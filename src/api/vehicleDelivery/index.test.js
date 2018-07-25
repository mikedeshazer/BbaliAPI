import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { VehicleDelivery } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, vehicleDelivery

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  vehicleDelivery = await VehicleDelivery.create({ userId: user })
})

test('POST /vehicleDeliveries 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ userAuth: userSession, rideId: 'test', rideCreatedat: 'test', vehicleId: 'test', pickupLatitude: 'test', pickupLongitude: 'test', dropLatitude: 'test', dropLongitude: 'test', status: 'test', pickup: 'test', drop: 'test', deliveryUserId: 'test', deliveryStartTime: 'test', deliveryEndTime: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.rideId).toEqual('test')
  expect(body.rideCreatedat).toEqual('test')
  expect(body.vehicleId).toEqual('test')
  expect(body.pickupLatitude).toEqual('test')
  expect(body.pickupLongitude).toEqual('test')
  expect(body.dropLatitude).toEqual('test')
  expect(body.dropLongitude).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.pickup).toEqual('test')
  expect(body.drop).toEqual('test')
  expect(body.deliveryUserId).toEqual('test')
  expect(body.deliveryStartTime).toEqual('test')
  expect(body.deliveryEndTime).toEqual('test')
  expect(typeof body.userId).toEqual('object')
})

test('POST /vehicleDeliveries 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /vehicleDeliveries 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ userAuth: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].userId).toEqual('object')
})

test('GET /vehicleDeliveries 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /vehicleDeliveries/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${vehicleDelivery.id}`)
    .query({ userAuth: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(vehicleDelivery.id)
  expect(typeof body.userId).toEqual('object')
})

test('GET /vehicleDeliveries/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${vehicleDelivery.id}`)
  expect(status).toBe(401)
})

test('GET /vehicleDeliveries/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ userAuth: userSession })
  expect(status).toBe(404)
})

test('PUT /vehicleDeliveries/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${vehicleDelivery.id}`)
    .send({ userAuth: userSession, rideId: 'test', rideCreatedat: 'test', vehicleId: 'test', pickupLatitude: 'test', pickupLongitude: 'test', dropLatitude: 'test', dropLongitude: 'test', status: 'test', pickup: 'test', drop: 'test', deliveryUserId: 'test', deliveryStartTime: 'test', deliveryEndTime: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(vehicleDelivery.id)
  expect(body.rideId).toEqual('test')
  expect(body.rideCreatedat).toEqual('test')
  expect(body.vehicleId).toEqual('test')
  expect(body.pickupLatitude).toEqual('test')
  expect(body.pickupLongitude).toEqual('test')
  expect(body.dropLatitude).toEqual('test')
  expect(body.dropLongitude).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.pickup).toEqual('test')
  expect(body.drop).toEqual('test')
  expect(body.deliveryUserId).toEqual('test')
  expect(body.deliveryStartTime).toEqual('test')
  expect(body.deliveryEndTime).toEqual('test')
  expect(typeof body.userId).toEqual('object')
})

test('PUT /vehicleDeliveries/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${vehicleDelivery.id}`)
    .send({ userAuth: anotherSession, rideId: 'test', rideCreatedat: 'test', vehicleId: 'test', pickupLatitude: 'test', pickupLongitude: 'test', dropLatitude: 'test', dropLongitude: 'test', status: 'test', pickup: 'test', drop: 'test', deliveryUserId: 'test', deliveryStartTime: 'test', deliveryEndTime: 'test' })
  expect(status).toBe(401)
})

test('PUT /vehicleDeliveries/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${vehicleDelivery.id}`)
  expect(status).toBe(401)
})

test('PUT /vehicleDeliveries/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ userAuth: anotherSession, rideId: 'test', rideCreatedat: 'test', vehicleId: 'test', pickupLatitude: 'test', pickupLongitude: 'test', dropLatitude: 'test', dropLongitude: 'test', status: 'test', pickup: 'test', drop: 'test', deliveryUserId: 'test', deliveryStartTime: 'test', deliveryEndTime: 'test' })
  expect(status).toBe(404)
})

test('DELETE /vehicleDeliveries/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${vehicleDelivery.id}`)
    .query({ userAuth: userSession })
  expect(status).toBe(204)
})

test('DELETE /vehicleDeliveries/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${vehicleDelivery.id}`)
    .send({ userAuth: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /vehicleDeliveries/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${vehicleDelivery.id}`)
  expect(status).toBe(401)
})

test('DELETE /vehicleDeliveries/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ userAuth: anotherSession })
  expect(status).toBe(404)
})

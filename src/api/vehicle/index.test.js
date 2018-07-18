import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Vehicle } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, vehicle

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  vehicle = await Vehicle.create({ createdByAdminUserId: user })
})

test('POST /vehicles 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, qrcodeIdentifier: 'test', name: 'test', type: 'test', currentStatus: 'test', lon: 'test', lat: 'test', description: 'test', occupiedByUserId: 'test', photoUrl: 'test', parkedAddress: 'test', parkedDescription: 'test', currentLockCode: 'test', chargedPercentageEstimate: 'test', make: 'test', year: 'test', model: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.qrcodeIdentifier).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.currentStatus).toEqual('test')
  expect(body.lon).toEqual('test')
  expect(body.lat).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.occupiedByUserId).toEqual('test')
  expect(body.photoUrl).toEqual('test')
  expect(body.parkedAddress).toEqual('test')
  expect(body.parkedDescription).toEqual('test')
  expect(body.currentLockCode).toEqual('test')
  expect(body.chargedPercentageEstimate).toEqual('test')
  expect(body.make).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.model).toEqual('test')
  expect(typeof body.createdByAdminUserId).toEqual('object')
})

test('POST /vehicles 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /vehicles 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].createdByAdminUserId).toEqual('object')
})

test('GET /vehicles 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /vehicles/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${vehicle.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(vehicle.id)
  expect(typeof body.createdByAdminUserId).toEqual('object')
})

test('GET /vehicles/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${vehicle.id}`)
  expect(status).toBe(401)
})

test('GET /vehicles/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /vehicles/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${vehicle.id}`)
    .send({ access_token: userSession, qrcodeIdentifier: 'test', name: 'test', type: 'test', currentStatus: 'test', lon: 'test', lat: 'test', description: 'test', occupiedByUserId: 'test', photoUrl: 'test', parkedAddress: 'test', parkedDescription: 'test', currentLockCode: 'test', chargedPercentageEstimate: 'test', make: 'test', year: 'test', model: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(vehicle.id)
  expect(body.qrcodeIdentifier).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.currentStatus).toEqual('test')
  expect(body.lon).toEqual('test')
  expect(body.lat).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.occupiedByUserId).toEqual('test')
  expect(body.photoUrl).toEqual('test')
  expect(body.parkedAddress).toEqual('test')
  expect(body.parkedDescription).toEqual('test')
  expect(body.currentLockCode).toEqual('test')
  expect(body.chargedPercentageEstimate).toEqual('test')
  expect(body.make).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.model).toEqual('test')
  expect(typeof body.createdByAdminUserId).toEqual('object')
})

test('PUT /vehicles/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${vehicle.id}`)
    .send({ access_token: anotherSession, qrcodeIdentifier: 'test', name: 'test', type: 'test', currentStatus: 'test', lon: 'test', lat: 'test', description: 'test', occupiedByUserId: 'test', photoUrl: 'test', parkedAddress: 'test', parkedDescription: 'test', currentLockCode: 'test', chargedPercentageEstimate: 'test', make: 'test', year: 'test', model: 'test' })
  expect(status).toBe(401)
})

test('PUT /vehicles/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${vehicle.id}`)
  expect(status).toBe(401)
})

test('PUT /vehicles/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, qrcodeIdentifier: 'test', name: 'test', type: 'test', currentStatus: 'test', lon: 'test', lat: 'test', description: 'test', occupiedByUserId: 'test', photoUrl: 'test', parkedAddress: 'test', parkedDescription: 'test', currentLockCode: 'test', chargedPercentageEstimate: 'test', make: 'test', year: 'test', model: 'test' })
  expect(status).toBe(404)
})

test('DELETE /vehicles/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${vehicle.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /vehicles/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${vehicle.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /vehicles/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${vehicle.id}`)
  expect(status).toBe(401)
})

test('DELETE /vehicles/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})

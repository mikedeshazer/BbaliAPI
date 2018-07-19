import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { VehicleReport } from '.'

const app = () => express(apiRoot, routes)

let userSession, vehicleReport

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  vehicleReport = await VehicleReport.create({ userId: user })
})

test('POST /vehicleReports 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, vehicleId: 'test', message: 'test', type: 'test', userLatitude: 'test', userLongitude: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.vehicleId).toEqual('test')
  expect(body.message).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.userLatitude).toEqual('test')
  expect(body.userLongitude).toEqual('test')
  expect(typeof body.userId).toEqual('object')
})

test('POST /vehicleReports 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /vehicleReports 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].userId).toEqual('object')
})

test('GET /vehicleReports 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /vehicleReports/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${vehicleReport.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(vehicleReport.id)
  expect(typeof body.userId).toEqual('object')
})

test('GET /vehicleReports/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${vehicleReport.id}`)
  expect(status).toBe(401)
})

test('GET /vehicleReports/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

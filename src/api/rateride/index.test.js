import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Rateride } from '.'

const app = () => express(apiRoot, routes)

let userSession, rateride

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  rateride = await Rateride.create({})
})

test('POST /raterides 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ userAuth: userSession, rideId: 'test', vehicleName: 'test', starRating: 'test', textRating: 'test', userLat: 'test', userLon: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.rideId).toEqual('test')
  expect(body.vehicleName).toEqual('test')
  expect(body.starRating).toEqual('test')
  expect(body.textRating).toEqual('test')
  expect(body.userLat).toEqual('test')
  expect(body.userLon).toEqual('test')
})

test('POST /raterides 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /raterides 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ userAuth: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /raterides 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

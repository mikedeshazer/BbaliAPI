import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Charger } from '.'

const app = () => express(apiRoot, routes)

let userSession, charger

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  charger = await Charger.create({ user })
})

test('POST /chargers 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, email: 'test', userLat: 'test', userLon: 'test', address: 'test', description: 'test', capacity: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.email).toEqual('test')
  expect(body.userLat).toEqual('test')
  expect(body.userLon).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.capacity).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /chargers 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { RateCard } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, rateCard

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  rateCard = await RateCard.create({})
})

test('POST /rate-cards 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ userAuth: adminSession, distance: 'test', price: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.distance).toEqual('test')
  expect(body.price).toEqual('test')
})

test('POST /rate-cards 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ userAuth: userSession })
  expect(status).toBe(401)
})

test('POST /rate-cards 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /rate-cards 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ userAuth: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /rate-cards 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ userAuth: userSession })
  expect(status).toBe(401)
})

test('GET /rate-cards 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /rate-cards/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${rateCard.id}`)
    .query({ userAuth: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(rateCard.id)
})

test('GET /rate-cards/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${rateCard.id}`)
    .query({ userAuth: userSession })
  expect(status).toBe(401)
})

test('GET /rate-cards/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${rateCard.id}`)
  expect(status).toBe(401)
})

test('GET /rate-cards/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ userAuth: adminSession })
  expect(status).toBe(404)
})

test('PUT /rate-cards/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${rateCard.id}`)
    .send({ userAuth: adminSession, distance: 'test', price: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(rateCard.id)
  expect(body.distance).toEqual('test')
  expect(body.price).toEqual('test')
})

test('PUT /rate-cards/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${rateCard.id}`)
    .send({ userAuth: userSession })
  expect(status).toBe(401)
})

test('PUT /rate-cards/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${rateCard.id}`)
  expect(status).toBe(401)
})

test('PUT /rate-cards/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ userAuth: adminSession, distance: 'test', price: 'test' })
  expect(status).toBe(404)
})

test('DELETE /rate-cards/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${rateCard.id}`)
    .query({ userAuth: adminSession })
  expect(status).toBe(204)
})

test('DELETE /rate-cards/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${rateCard.id}`)
    .query({ userAuth: userSession })
  expect(status).toBe(401)
})

test('DELETE /rate-cards/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${rateCard.id}`)
  expect(status).toBe(401)
})

test('DELETE /rate-cards/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ userAuth: adminSession })
  expect(status).toBe(404)
})

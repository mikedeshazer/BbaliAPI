import { Delivery } from '.'
import { User } from '../user'

let user, delivery

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  delivery = await Delivery.create({ user, email: 'test', userLat: 'test', userLon: 'test', address: 'test', description: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = delivery.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(delivery.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.email).toBe(delivery.email)
    expect(view.userLat).toBe(delivery.userLat)
    expect(view.userLon).toBe(delivery.userLon)
    expect(view.address).toBe(delivery.address)
    expect(view.description).toBe(delivery.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = delivery.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(delivery.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.email).toBe(delivery.email)
    expect(view.userLat).toBe(delivery.userLat)
    expect(view.userLon).toBe(delivery.userLon)
    expect(view.address).toBe(delivery.address)
    expect(view.description).toBe(delivery.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

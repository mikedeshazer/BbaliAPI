import { Charger } from '.'
import { User } from '../user'

let user, charger

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  charger = await Charger.create({ user, email: 'test', userLat: 'test', userLon: 'test', address: 'test', description: 'test', capacity: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = charger.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(charger.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.email).toBe(charger.email)
    expect(view.userLat).toBe(charger.userLat)
    expect(view.userLon).toBe(charger.userLon)
    expect(view.address).toBe(charger.address)
    expect(view.description).toBe(charger.description)
    expect(view.capacity).toBe(charger.capacity)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = charger.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(charger.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.email).toBe(charger.email)
    expect(view.userLat).toBe(charger.userLat)
    expect(view.userLon).toBe(charger.userLon)
    expect(view.address).toBe(charger.address)
    expect(view.description).toBe(charger.description)
    expect(view.capacity).toBe(charger.capacity)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

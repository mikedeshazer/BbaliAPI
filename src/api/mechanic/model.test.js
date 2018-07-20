import { Mechanic } from '.'
import { User } from '../user'

let user, mechanic

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  mechanic = await Mechanic.create({ user, email: 'test', userLat: 'test', userLon: 'test', address: 'test', description: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = mechanic.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(mechanic.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.email).toBe(mechanic.email)
    expect(view.userLat).toBe(mechanic.userLat)
    expect(view.userLon).toBe(mechanic.userLon)
    expect(view.address).toBe(mechanic.address)
    expect(view.description).toBe(mechanic.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = mechanic.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(mechanic.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.email).toBe(mechanic.email)
    expect(view.userLat).toBe(mechanic.userLat)
    expect(view.userLon).toBe(mechanic.userLon)
    expect(view.address).toBe(mechanic.address)
    expect(view.description).toBe(mechanic.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

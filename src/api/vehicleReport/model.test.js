import { VehicleReport } from '.'
import { User } from '../user'

let user, vehicleReport

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  vehicleReport = await VehicleReport.create({ userId: user, vehicleId: 'test', message: 'test', type: 'test', userLatitude: 'test', userLongitude: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = vehicleReport.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(vehicleReport.id)
    expect(typeof view.userId).toBe('object')
    expect(view.userId.id).toBe(user.id)
    expect(view.vehicleId).toBe(vehicleReport.vehicleId)
    expect(view.message).toBe(vehicleReport.message)
    expect(view.type).toBe(vehicleReport.type)
    expect(view.userLatitude).toBe(vehicleReport.userLatitude)
    expect(view.userLongitude).toBe(vehicleReport.userLongitude)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = vehicleReport.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(vehicleReport.id)
    expect(typeof view.userId).toBe('object')
    expect(view.userId.id).toBe(user.id)
    expect(view.vehicleId).toBe(vehicleReport.vehicleId)
    expect(view.message).toBe(vehicleReport.message)
    expect(view.type).toBe(vehicleReport.type)
    expect(view.userLatitude).toBe(vehicleReport.userLatitude)
    expect(view.userLongitude).toBe(vehicleReport.userLongitude)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

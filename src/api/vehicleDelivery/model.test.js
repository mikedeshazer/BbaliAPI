import { VehicleDelivery } from '.'
import { User } from '../user'

let user, vehicleDelivery

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  vehicleDelivery = await VehicleDelivery.create({ userId: user, rideId: 'test', rideCreatedat: 'test', vehicleId: 'test', pickupLatitude: 'test', pickupLongitude: 'test', dropLatitude: 'test', dropLongitude: 'test', status: 'test', pickup: 'test', drop: 'test', deliveryUserId: 'test', deliveryStartTime: 'test', deliveryEndTime: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = vehicleDelivery.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(vehicleDelivery.id)
    expect(typeof view.userId).toBe('object')
    expect(view.userId.id).toBe(user.id)
    expect(view.rideId).toBe(vehicleDelivery.rideId)
    expect(view.rideCreatedat).toBe(vehicleDelivery.rideCreatedat)
    expect(view.vehicleId).toBe(vehicleDelivery.vehicleId)
    expect(view.pickupLatitude).toBe(vehicleDelivery.pickupLatitude)
    expect(view.pickupLongitude).toBe(vehicleDelivery.pickupLongitude)
    expect(view.dropLatitude).toBe(vehicleDelivery.dropLatitude)
    expect(view.dropLongitude).toBe(vehicleDelivery.dropLongitude)
    expect(view.status).toBe(vehicleDelivery.status)
    expect(view.pickup).toBe(vehicleDelivery.pickup)
    expect(view.drop).toBe(vehicleDelivery.drop)
    expect(view.deliveryUserId).toBe(vehicleDelivery.deliveryUserId)
    expect(view.deliveryStartTime).toBe(vehicleDelivery.deliveryStartTime)
    expect(view.deliveryEndTime).toBe(vehicleDelivery.deliveryEndTime)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = vehicleDelivery.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(vehicleDelivery.id)
    expect(typeof view.userId).toBe('object')
    expect(view.userId.id).toBe(user.id)
    expect(view.rideId).toBe(vehicleDelivery.rideId)
    expect(view.rideCreatedat).toBe(vehicleDelivery.rideCreatedat)
    expect(view.vehicleId).toBe(vehicleDelivery.vehicleId)
    expect(view.pickupLatitude).toBe(vehicleDelivery.pickupLatitude)
    expect(view.pickupLongitude).toBe(vehicleDelivery.pickupLongitude)
    expect(view.dropLatitude).toBe(vehicleDelivery.dropLatitude)
    expect(view.dropLongitude).toBe(vehicleDelivery.dropLongitude)
    expect(view.status).toBe(vehicleDelivery.status)
    expect(view.pickup).toBe(vehicleDelivery.pickup)
    expect(view.drop).toBe(vehicleDelivery.drop)
    expect(view.deliveryUserId).toBe(vehicleDelivery.deliveryUserId)
    expect(view.deliveryStartTime).toBe(vehicleDelivery.deliveryStartTime)
    expect(view.deliveryEndTime).toBe(vehicleDelivery.deliveryEndTime)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

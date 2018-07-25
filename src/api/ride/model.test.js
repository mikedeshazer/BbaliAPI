import { Ride } from '.'
import { User } from '../user'

let user, ride

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  ride = await Ride.create({ userId: user, timeStarted: 'test', type: 'test', duration: 'test', ratePerUnitTime: 'test', currency: 'test', timeEnded: 'test', paymentMethodID: 'test', status: 'test', rideTotal: 'test', locationPickupLon: 'test', locationPickupLat: 'test', locationdropOffLon: 'test', locationDropoffLat: 'test', loctionDropoffAddress: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = ride.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(ride.id)
    expect(typeof view.userId).toBe('object')
    expect(view.userId.id).toBe(user.id)
    expect(view.timeStarted).toBe(ride.timeStarted)
    expect(view.type).toBe(ride.type)
    expect(view.duration).toBe(ride.duration)
    expect(view.ratePerUnitTime).toBe(ride.ratePerUnitTime)
    expect(view.currency).toBe(ride.currency)
    expect(view.timeEnded).toBe(ride.timeEnded)
    expect(view.paymentMethodID).toBe(ride.paymentMethodID)
    expect(view.status).toBe(ride.status)
    expect(view.rideTotal).toBe(ride.rideTotal)
    expect(view.locationPickupLon).toBe(ride.locationPickupLon)
    expect(view.locationPickupLat).toBe(ride.locationPickupLat)
    expect(view.locationdropOffLon).toBe(ride.locationdropOffLon)
    expect(view.locationDropoffLat).toBe(ride.locationDropoffLat)
    expect(view.loctionDropoffAddress).toBe(ride.loctionDropoffAddress)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = ride.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(ride.id)
    expect(typeof view.userId).toBe('object')
    expect(view.userId.id).toBe(user.id)
    expect(view.timeStarted).toBe(ride.timeStarted)
    expect(view.type).toBe(ride.type)
    expect(view.duration).toBe(ride.duration)
    expect(view.ratePerUnitTime).toBe(ride.ratePerUnitTime)
    expect(view.currency).toBe(ride.currency)
    expect(view.timeEnded).toBe(ride.timeEnded)
    expect(view.paymentMethodID).toBe(ride.paymentMethodID)
    expect(view.status).toBe(ride.status)
    expect(view.rideTotal).toBe(ride.rideTotal)
    expect(view.locationPickupLon).toBe(ride.locationPickupLon)
    expect(view.locationPickupLat).toBe(ride.locationPickupLat)
    expect(view.locationdropOffLon).toBe(ride.locationdropOffLon)
    expect(view.locationDropoffLat).toBe(ride.locationDropoffLat)
    expect(view.loctionDropoffAddress).toBe(ride.loctionDropoffAddress)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

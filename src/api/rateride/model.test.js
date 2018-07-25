import { Rateride } from '.'

let rateride

beforeEach(async () => {
  rateride = await Rateride.create({ rideId: 'test', vehicleName: 'test', starRating: 'test', textRating: 'test', userLat: 'test', userLon: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = rateride.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(rateride.id)
    expect(view.rideId).toBe(rateride.rideId)
    expect(view.vehicleName).toBe(rateride.vehicleName)
    expect(view.starRating).toBe(rateride.starRating)
    expect(view.textRating).toBe(rateride.textRating)
    expect(view.userLat).toBe(rateride.userLat)
    expect(view.userLon).toBe(rateride.userLon)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = rateride.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(rateride.id)
    expect(view.rideId).toBe(rateride.rideId)
    expect(view.vehicleName).toBe(rateride.vehicleName)
    expect(view.starRating).toBe(rateride.starRating)
    expect(view.textRating).toBe(rateride.textRating)
    expect(view.userLat).toBe(rateride.userLat)
    expect(view.userLon).toBe(rateride.userLon)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

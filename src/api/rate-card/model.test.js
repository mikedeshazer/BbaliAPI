import { RateCard } from '.'

let rateCard

beforeEach(async () => {
  rateCard = await RateCard.create({ distance: 'test', price: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = rateCard.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(rateCard.id)
    expect(view.distance).toBe(rateCard.distance)
    expect(view.price).toBe(rateCard.price)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = rateCard.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(rateCard.id)
    expect(view.distance).toBe(rateCard.distance)
    expect(view.price).toBe(rateCard.price)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

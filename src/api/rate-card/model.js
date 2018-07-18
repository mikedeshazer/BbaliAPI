import mongoose, { Schema } from 'mongoose'

const rateCardSchema = new Schema({
  distance: {
    type: String
  },
  price: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

rateCardSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      distance: this.distance,
      price: this.price,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('RateCard', rateCardSchema)

export const schema = model.schema
export default model

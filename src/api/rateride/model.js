import mongoose, { Schema } from 'mongoose'

const raterideSchema = new Schema({
  rideId: {
    type: String
  },
  vehicleName: {
    type: String
  },
  starRating: {
    type: String
  },
  textRating: {
    type: String
  },
  userLat: {
    type: String
  },
  userLon: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

raterideSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      rideId: this.rideId,
      vehicleName: this.vehicleName,
      starRating: this.starRating,
      textRating: this.textRating,
      userLat: this.userLat,
      userLon: this.userLon,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Rateride', raterideSchema)

export const schema = model.schema
export default model

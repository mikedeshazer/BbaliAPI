import mongoose, { Schema } from 'mongoose'

const rideSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  vehicleId: {
    type: Schema.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  timeStarted: {
    type: Date
  },
  type: {
    type: String,
    required: true
  },
  duration: {
    type: String
  },
  ratePerUnitTime: {
    type: String
  },
  currency: {
    type: String,
    required: true,
    default: "KWD"
  },
  timeEnded: {
    type: Date
  },
  paymentMethodId: {
    type: String,
    required: true
  },
  status: {
    type: String
  },
  rideTotal: {
    type: String
  },
  locationPickupLon: {
    type: String
  },
  locationPickupLat: {
    type: String
  },
  locationdropOffLon: {
    type: String
  },
  locationDropoffLat: {
    type: String
  },
  loctionDropoffAddress: {
    type: String
  },
  fromShop:{
    type: Boolean,
    required:true,
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

rideSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      userId: this.userId,
      timeStarted: this.timeStarted,
      type: this.type,
      duration: this.duration,
      ratePerUnitTime: this.ratePerUnitTime,
      currency: this.currency,
      timeEnded: this.timeEnded,
      paymentMethodID: this.paymentMethodID,
      status: this.status,
      rideTotal: this.rideTotal,
      locationPickupLon: this.locationPickupLon,
      locationPickupLat: this.locationPickupLat,
      locationdropOffLon: this.locationdropOffLon,
      locationDropoffLat: this.locationDropoffLat,
      loctionDropoffAddress: this.loctionDropoffAddress,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Ride', rideSchema)

export const rSchema = model.schema
export default model

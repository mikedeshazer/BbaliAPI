import mongoose, { Schema } from 'mongoose'

const vehicleDeliverySchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  rideId: {
    type: Schema.ObjectId,
    ref: 'Ride',
    required: true
  },
  rideCreatedat: {
    type: String
  },
  vehicleId: {
    type: Schema.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  pickupLatitude: {
    type: String
  },
  pickupLongitude: {
    type: String
  },
  dropLatitude: {
    type: String
  },
  dropLongitude: {
    type: String
  },
  status: {
    type: String
  },
  pickup: {
    type: [Number],
    default: [0, 0],
    required: true
  },
  drop: {
    type: [Number],
    default: [0, 0],
    required: true
  },
  deliveryUserId: {
    type: String
  },
  deliveryStartTime: {
    type: String
  },
  deliveryEndTime: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

vehicleDeliverySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      userId: this.userId.view(full),
      rideId: this.rideId,
      rideCreatedat: this.rideCreatedat,
      vehicleId: this.vehicleId,
      pickupLatitude: this.pickupLatitude,
      pickupLongitude: this.pickupLongitude,
      dropLatitude: this.dropLatitude,
      dropLongitude: this.dropLongitude,
      status: this.status,
      pickup: this.pickup,
      drop: this.drop,
      deliveryUserId: this.deliveryUserId,
      deliveryStartTime: this.deliveryStartTime,
      deliveryEndTime: this.deliveryEndTime,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('VehicleDelivery', vehicleDeliverySchema)

export const schema = model.schema
export default model

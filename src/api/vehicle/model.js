import mongoose, { Schema } from 'mongoose'

const vehicleSchema = new Schema({
  createdByAdminUserId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  qrcodeIdentifier: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  currentStatus: {
    type: String
  },
  lon: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  occupiedByUserId: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  photoUrl: {
    type: String
  },
  parkedAddress: {
    type: String
  },
  parkedDescription: {
    type: String
  },
  currentLockCode: {
    type: String
  },
  chargedPercentageEstimate: {
    type: String
  },
  make: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true,
    default: 'Available'
  },
  loc: {
    type: [Number],
    default: [0, 0],
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})
vehicleSchema.index({loc:'2d'})
vehicleSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      qrcodeIdentifier: this.qrcodeIdentifier,
      name: this.name,
      type: this.type,
      currentStatus: this.currentStatus,
      lon: this.lon,
      lat: this.lat,
      description: this.description,
      occupiedByUserId: this.occupiedByUserId,
      photoUrl: this.photoUrl,
      parkedAddress: this.parkedAddress,
      parkedDescription: this.parkedDescription,
      currentLockCode: this.currentLockCode,
      chargedPercentageEstimate: this.chargedPercentageEstimate,
      make: this.make,
      year: this.year,
      model: this.model,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      status:this.status
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Vehicle', vehicleSchema)

export const schema = model.schema
export default model

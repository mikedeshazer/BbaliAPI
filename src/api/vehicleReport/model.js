import mongoose, { Schema } from 'mongoose'

const vehicleReportSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  vehicleId: {
    type: String
  },
  message: {
    type: String
  },
  type: {
    type: String
  },
  userLatitude: {
    type: String
  },
  userLongitude: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

vehicleReportSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      userId: this.userId.view(full),
      vehicleId: this.vehicleId,
      message: this.message,
      type: this.type,
      userLatitude: this.userLatitude,
      userLongitude: this.userLongitude,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('VehicleReport', vehicleReportSchema)

export const vrschema = model.schema
export default model

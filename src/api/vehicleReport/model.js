import mongoose, { Schema } from 'mongoose'

const vehicleReportSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  vehicleName: {
    type: Schema.ObjectId,
    ref: 'Vehicle'
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
  },
  userEmail: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
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
      vehicleName: this.vehicleName,
      userEmail: this.userEmail,
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

export const schema = model.schema
export default model

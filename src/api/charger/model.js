import mongoose, { Schema } from 'mongoose'

const chargerSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  email: {
    type: String
  },
  userLat: {
    type: String
  },
  userLon: {
    type: String
  },
  address: {
    type: String
  },
  description: {
    type: String
  },
  capacity: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

chargerSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      email: this.email,
      userLat: this.userLat,
      userLon: this.userLon,
      address: this.address,
      description: this.description,
      capacity: this.capacity,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Charger', chargerSchema)

export const schema = model.schema
export default model

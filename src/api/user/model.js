import crypto from 'crypto'
import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { env } from '../../config'

const roles = ['user', 'admin']

const userSchema = new Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String
  },
  fullName: {
    type: String
  },
  selectedLanguage: {
    type: String,
    default: 'English'
  },
  password: {
    type: String,
    required: false,
    minlength: 6
  },
  name: {
    type: String,
    index: true,
    trim: true
  },
  role: {
    type: String,
    enum: roles,
    default: 'user'
  },
  picture: {
    type: String,
    trim: true
  },
  bitcoinAddress: {
    type: String,
    trim: true
  },
  bitcoinKey: {
    type: String,
    trim: true
  },
  etherAddress: {
    type: String,
    trim: true
  },
  etherKey: {
    type: String,
    trim: true
  },
  userLat:{type:String},
  userLon:{type:String},
  address:{type:String},
  description:{type:String},
  capacity:{type:Number},
  isCharger:{type:Boolean},
  isApproved:{type:Boolean},
  status:{type:String},
  isMechanic : {type : Boolean},
  isDelivery : {type : Boolean}
}, {
  timestamps: true
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  /* istanbul ignore next */
  const rounds = env === 'test' ? 1 : 9

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash
    next()
  }).catch(next)
})

userSchema.methods = {
  view (full) {
    let view = {}
    let fields = ['id', 'email', 'phone', 'bitcoinAddress', 'etherAddress'];

    if (full) {
      fields = [...fields]
    }

    fields.forEach((field) => { view[field] = this[field] })

    return view
  },

  authenticate (password) {
    return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
  },

  chargerView(full){
    const view = {
      // simple view
      id: this.id,
      email: this.email,
      userLat: this.userLat,
      userLon: this.userLon,
      address: this.address,
      description: this.description,
      isCharger: this.isCharger,
      isMechanic: this.isMechanic,
      isDelivery: this.isDelivery,
      status: this.status,
      isApproved: this.isApproved,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt

    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

userSchema.statics = {
  roles
}

userSchema.plugin(mongooseKeywords, { paths: ['email', 'name'] })

const model = mongoose.model('User', userSchema)

export const schema = model.schema
export default model

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
    required: true,
    unique: true,
    trim: true,
    lowercase: true
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
  status:{type:String}
}, {
  timestamps: true
})

userSchema.path('email').set(function (email) {
  if (!this.picture || this.picture.indexOf('https://gravatar.com') === 0) {
    const hash = crypto.createHash('md5').update(email).digest('hex')
    this.picture = `https://gravatar.com/avatar/${hash}?d=identicon`
  }

  if (!this.name) {
    this.name = email.replace(/^(.+)@.+$/, '$1')
  }

  return email
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
    let fields = ['id','bitcoinAddress','bitcoinKey','etherAddress','etherKey']

    if (full) {
      fields = [...fields, 'email', 'createdAt']
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
      isCharger:this.isCharger,
      status:this.status,
      isApproved:this.isApproved,
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

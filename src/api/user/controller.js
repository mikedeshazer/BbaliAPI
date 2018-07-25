import {success, notFound} from '../../services/response/'
import {User} from '.'
import {bitcoin} from 'bitcoinjs-lib'
import {VehicleDelivery} from '../vehicleDelivery'
import {signSync} from "../../services/jwt";

export const index = ({querymen: {query, select, cursor}}, res, next) => {
  User.count(query)
    .then(count => User.find(query, select, cursor)
      .then(users => ({
        rows: users.map((user) => user.view()),
        count
      }))
    )
    .then(success(res))
    .catch(next)
}

export const show = ({params}, res, next) => {
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.view() : null)
    .then(success(res))
    .catch(next)
}

export const showMe = ({user}, res) => {
  res.json(user.view(true))
}

export const create = ({bodymen: {body}}, res, next) => {
  if (!(body.email || body.phone)) {
    res.status(500).send({error: true, msg: 'Email Or Phone Required'});
  } else {
    var bitcoin = require("bitcoinjs-lib");
    var keyPair = bitcoin.ECPair.makeRandom();
    var address = keyPair.getAddress();
    var pkey = keyPair.toWIF();
    body.bitcoinAddress = address;
    body.bitcoinKey = pkey;
    var ethers = require('ethers');
    var privateKey = "0x0123456789012345678901234567890123456789012345678901234567890123";
    var wallet = ethers.Wallet.createRandom();
    body.etherKey = privateKey;
    body.etherAddress = wallet.address;
    User.create(body)
      .then((user) => {
        var u = user.view(true)
        const token = signSync(user.id)
        const final = {
          error: false,
          msg: 'user account successfully created',
          data: {...u, userAuth: token}
        }
        res.status(201).send(final)
      })
      .catch((err) => {
        /* istanbul ignore else */
        if (err.name === 'MongoError' && err.code === 11000) {
          res.status(409).json({
            error: true,
            message: 'email or phone already registered'
          })
        } else {
          next(err)
        }
      })
  }
}

export const changeStatus = ({user, bodymen: {body}, params}, res, next) => {
  if (!user._id) {
    res = 'No Id to change Status'
  } else {
    User.findById(user._id)
      .populate('user')
      .then(notFound(res))
      .then((data) => {
        if ((data.isCharger === 'true') || (data.isMechanic === 'true') || (data.isDelivery === 'true')) {
          if (data.isApproved.toString() === 'true') {
            Object.assign(data, body).save()
            const final = {
              error: false,
              msg: 'Status updated',
              data: {'timstamp': data.createdAt,
                'status': body.status
              }
            }
            res.status(200).send(final)
          } else {
            body.status = 'off'
            Object.assign(data, body).save()
            res.status(401).send({ERROR: 'You are not APPROVED user'})
          }
        } else {
          res.status(401).send({ERROR: 'You are not AUTHORIZED person'})
        }
      })
      .catch(next)
  }
}

export const update = ({bodymen: {body}, params, user}, res, next) => {
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isAdmin = user.role === 'admin'
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate && !isAdmin) {
        res.status(401).json({
          valid: false,
          message: 'You can\'t change other user\'s data'
        })
        return null
      }
      return result
    })
    .then((user) => user ? Object.assign(user, body).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)
}

export const updatePassword = ({bodymen: {body}, params, user}, res, next) => {
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate) {
        res.status(401).json({
          valid: false,
          param: 'password',
          message: 'You can\'t change other user\'s password'
        })
        return null
      }
      return result
    })
    .then((user) => user ? user.set({password: body.password}).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)
}

export const destroy = ({params}, res, next) => {
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.remove() : null)
    .then(success(res, 204))
    .catch(next)
}

export const showOpportunities = ({user, bodymen: {body}, params}, res, next) => {
  if (!body.userLat) {
    res.status(500).send({error: 'Latitude is required'})
  } else if (!body.userLon) {
    res.status(500).send({error: 'Longitude Id is required'})
  } else {
    if (!body.radius) {
      body.radius = 10
    }
    const coords = [Number(body.userLat), Number(body.userLon)]
    VehicleDelivery.find({
      pickup: {$near: {$geometry: {type: 'Point', coordinates: coords}, $maxDistance: body.radius * 1000}},
      status: 'pending'
    })
      .then(notFound(res))
      .then((locations) => {
        res.status(200).send({error: false, msg: locations.length + ' Delivery is pending nearby', data: locations})
      })
      .catch(next)
  }
}

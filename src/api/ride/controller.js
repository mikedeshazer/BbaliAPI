import {success, notFound, authorOrAdmin} from '../../services/response/'
import {Ride} from '.'
import {Vehicle} from './../vehicle'

export const create = ({user, bodymen: {body}}, res, next) =>
  Ride.create({...body, userId: user})
    .then((ride) => ride.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({user, querymen: {query, select, cursor}}, res, next) =>
  Ride.find({userId: user})
    .then((rides) => rides.map((ride) => ride.view()))
    .then(success(res))
    .catch(next)

export const index1 = ({querymen: {query, select, cursor}}, res, next) =>
  Ride.find(query, select, cursor)
    .populate('userId')
    .then((rides) => rides.map((ride) => ride.view()))
    .then(success(res))
    .catch(next)

export const show = ({params}, res, next) =>
  Ride.findById(params.id)
    .populate('userId')
    .then(notFound(res))
    .then((ride) => ride ? ride.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({user, bodymen: {body}, params}, res, next) =>
  Ride.findById(params.id)
    .populate('userId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'userId'))
    .then((ride) => ride ? Object.assign(ride, body).save() : null)
    .then((ride) => ride ? ride.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({user, params}, res, next) =>
  Ride.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'userId'))
    .then((ride) => ride ? ride.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const unlockQR = ({user, bodymen: {body}}, res, next) => {
  if (!body.rideId) {
    res.status(500).send({error: 'Ride Id is required'})
  } else {
    Ride.findById(body.rideId)
      .then(notFound(res))
      .then((ride) => {
        Vehicle.findById(ride.vehicleId)
          .then((vehicle) => vehicle ? Object.assign(vehicle, {status: 'Unlocked'}).save() : null)
        var final = {
          passcode: getUnlockCode(ride.vehicleId.toString()),
          Msg: 'Ride Unlocked Successfully'
        }
        res.status(200).send(final)
      })
      .catch(next)
  }
}

export const start = ({user, bodymen: {body}}, res, next) => {
  if (!body.rideId) {
    res.status(500).send({error: 'Ride Id is required'})
  } else {
    Ride.findById(body.rideId)
      .then(notFound(res))
      .then((ride) => {
        Vehicle.findById(ride.vehicleId)
          .then((vehicle) => {
            Object.assign(vehicle, {status: 'Riding'}).save()
            Object.assign(ride, {timeStarted: new Date()}).save()
            res.status(200).send({Msg: 'Ride Started Successfully'})
          })
      })
      .catch(next)
  }
}

export const lock = ({user, bodymen: {body}}, res, next) => {
  if (!body.rideId) {
    res.status(500).send({error: 'Ride Id is required'})
  } else {
    Ride.findById(body.rideId)
      .then(notFound(res))
      .then((ride) => {
        Vehicle.findById(ride.vehicleId)
          .then((vehicle) => {
            Object.assign(vehicle, {status: 'Locked'}).save()
            res.status(200).send({Msg: 'Ride Locked succesfully'})
          })
      })
      .catch(next)
  }
}

export const end = ({user, bodymen: {body}}, res, next) => {
  if (!body.rideId) {
    res.status(500).send({error: 'Ride Id is required'})
  } else {
    Ride.findById(body.rideId)
      .then(notFound(res))
      .then((ride) => {
        Vehicle.findById(ride.vehicleId)
          .then((vehicle) => {
            Object.assign(vehicle, {status: 'Available'}).save()
            Object.assign(ride, {timeEnded: new Date()}).save()
            res.status(200).send({Msg: 'Ride available'})
          })
      })
      .catch(next)
  }
}

function getUnlockCode(str) {
  String.prototype.hashCode = function () {
    var hash = 0, i, chr
    if (this.length === 0) return hash
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i)
      hash = ((hash << 5) - hash) + chr
      hash |= 0 // Convert to 32bit integer
    }
    return hash
  }
  var x = new Date()
  x.setUTCHours(0)
  var minutes = x.getMinutes()
  var minuteDigits = 0
  x.setSeconds(0)
  if (minutes > 9) {
    minuteDigits = minutes.toString().slice(-2, -1)
  }
  var minuteDigit = parseInt(minuteDigits)
  var newMinutes = minuteDigit * 10
  if (minutes > (newMinutes + 4)) {
    minuteDigits = newMinutes + 5
  } else {
    minuteDigits = newMinutes
  }

  x.setMinutes(minuteDigits)
  x.setMilliseconds(0)
  var timeSeed = x.getTime()
  console.log(x)
  var seed = str.hashCode()
  var rawUnlock = timeSeed / seed

  var unlockCode = rawUnlock.toString().slice(-5, -1)
  return unlockCode
}

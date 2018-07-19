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
    const passcode = Math.floor(100000 + Math.random() * 900000)
    Ride.findById(body.rideId)
      .then(notFound(res))
      .then((ride) => {
        Vehicle.findById(ride.vehicleId)
          .then((vehicle) => vehicle ? Object.assign(vehicle, {status: 'Unlocked'}).save() : null)
      })
      .then(() => {
        var final = {
          passcode: passcode,
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

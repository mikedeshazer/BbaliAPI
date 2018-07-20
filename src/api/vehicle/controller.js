import {success, notFound, authorOrAdmin} from '../../services/response/'
import {Vehicle} from '.'
import {Ride} from './../ride/'
import {VehicleDelivery} from './../vehicleDelivery'
import {VehicleReport} from './../vehicleReport'

export const create = ({user, bodymen: {body}}, res, next) => {
  var loc = [body.lat, body.lon]
  Vehicle.create({...body, createdByAdminUserId: user, loc: loc})
    .then((vehicle) => vehicle.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const index = ({querymen: {query, select, cursor}}, res, next) => {
  Vehicle.find(query, select, cursor)
    .populate('createdByAdminUserId')
    .then((vehicles) => vehicles.map((vehicle) => vehicle.view()))
    .then(success(res))
    .catch(next)
}

export const show = ({params}, res, next) => {
  Vehicle.findById(params.id)
    .populate('createdByAdminUserId')
    .then(notFound(res))
    .then((vehicle) => vehicle ? vehicle.view() : null)
    .then(success(res))
    .catch(next)
}

export const update = ({user, bodymen: {body}, params}, res, next) => {
  Vehicle.findById(params.id)
    .populate('createdByAdminUserId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdByAdminUserId'))
    .then((vehicle) => vehicle ? Object.assign(vehicle, body).save() : null)
    .then((vehicle) => vehicle ? vehicle.view(true) : null)
    .then(success(res))
    .catch(next)
}

export const destroy = ({user, params}, res, next) => {
  Vehicle.findById(params.id)
    .then(notFound(res))
    .then((vehicle) => vehicle ? vehicle.remove() : null)
    .then(success(res, 204))
    .catch(next)
}

function getUnlockCode(str) {
  console.log('inside getUnlock:', str)
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

export const rent = ({user, bodymen: {body}, params}, res, next) => {
  if (!body.vehicleName) {
    res.status(500).send({error: 'Vehicle Id is required'})
  } else if (!body.paymentMethod) {
    res.status(500).send({error: 'Payment Id is required'})
  } else if (!body.type) {
    res.status(500).send({error: 'Type is required'})
  } else if (!body.fromShop) {
    res.status(500).send({error: 'fromShop is required'})
  } else {
    if (body.fromShop === 'false') {
      if (!body.pickupLat) {
        res.status(500).send({error: 'User Latitude is required'})
      } else if (!body.pickupLon) {
        res.status(500).send({error: 'User Longitude is required'})
      }
    }
    // TODO : Verify Payment Method of User
    Vehicle.findById(body.vehicleName)
      .then(notFound(res))
      .then((vehicle) => {
        if (vehicle.status === 'Available' || vehicle.status === '') {
          const ride = {
            userId: user,
            paymentMethodId: body.paymentMethod,
            vehicleId: vehicle,
            locationPickupLat: body.pickupLat,
            locationPickupLon: body.pickupLon,
            type: body.type,
            duration: body.duration,
            fromShop: body.fromShop,
            deductCredits: body.deductCredits,
            status: 'booked'
          }
          Ride.create(ride)
            .then((ride) => {
              Object.assign(vehicle, {status: 'Booked', occupiedByUserId: user}).save()
              if (ride.fromShop.toString() !== 'true') {
                const vehicleDelivery = {
                  userId: user,
                  rideId: ride,
                  pickup: [vehicle.lat, vehicle.lon],
                  drop: [body.pickupLat, body.pickupLon],
                  vehicleId: ride.vehicleId,
                  pickupLatitude: vehicle.lat,
                  pickupLongitude: vehicle.lon,
                  dropLatitude: body.pickupLat,
                  dropLongitude: body.pickupLon,
                  status: 'pending'
                }
                VehicleDelivery.create(vehicleDelivery)
                  .catch(next)
              }
              const final = {
                error: false,
                msg: 'Vehicle ' + vehicle.name + ' rented.',
                data: vehicle.rentView(true)
              }
              final['data']['unlockCode'] = getUnlockCode(vehicle.id)
              res.status(200).send(final)
            })
            .catch(next)
        } else {
          res.status(500).send({error: vehicle.name + ' is not available right now.'})
        }
      })
      .catch(next)
  }
}

export const nearBy = ({user, bodymen: {body}, params}, res, next) => {
  if (!body.lat) {
    res.status(500).send({error: 'Latitude is required'})
  } else if (!body.lon) {
    res.status(500).send({error: 'Longitude Id is required'})
  } else {
    if (!body.range) {
      body.range = 10
    }
    const coords = [Number(body.lat), Number(body.lon)]
    console.log(coords)
    Vehicle.find({
      loc: {$near: {$geometry: {type: 'Point', coordinates: coords}, $maxDistance: body.range * 1000}},
      status: 'Available'
    })
      .then(notFound(res))
      .then((locations) => {
        res.status(200).send({error: false, msg: locations.length + ' vehicles nearby', data: locations})
      })
      .catch(next)
  }
}

export const lock = ({user, bodymen: {body}}, res, next) => {
  if (!body.vehicleName) {
    res.status(500).send({error: 'Vehicle Name is required'})
  }
  if (!body.userLat) {
    res.status(500).send({error: 'Latitude is required'})
  }
  if (!body.userLon) {
    res.status(500).send({error: 'Longitude Id is required'})
  } else {
    Vehicle.findById(body.vehicleName)
      .then((vehicle) => {
        Object.assign(vehicle, {status: 'Locked', lat: body.userLat, lon: body.userLon, loc: [body.userLat, body.userLon]}).save()
        res.status(200).send({error: false, Msg: 'Ride Locked succesfully'})
      })
      .catch(next)
  }
}

export const report = ({user, bodymen: {body}}, res, next) => {
  if (!body.userEmail) {
    res.status(500).send({error: 'User email is required'})
  } if (!body.message) {
    res.status(500).send({error: 'Message is required'})
  } if (!body.type) {
    res.status(500).send({error: 'Type is required'})
  } else {
    const reportData = {
      userId: user,
      userEmail: body.userEmail,
      vehicleName: body.vehicleName,
      message: body.message,
      type: body.type,
      userLatitude: body.userLat,
      userLongitude: body.userLon
    }
    VehicleReport.create(reportData)
      .then((data) => {
        const final = {
          error: false,
          msg: 'vehicle report posted',
          data: {
            'users message': body.message,
            'vehicleId': body.vehicleName
          }
        }
        res.status(200).send(final)
      })
      .catch(next)
  }
}

export const checkout = ({user, bodymen: {body}, params}, res, next) => {
  if (!body.vehicleName) {
    res.status(500).send({error: true, msg: 'Vehicle Name is required'})
  }
  if (!body.userLat) {
    res.status(500).send({error: true, msg: 'Latitude is required'})
  }
  if (!body.userLon) {
    res.status(500).send({error: true, msg: 'Longitude is required'})
  } else {
    // todo: fetch rent data from db
    const card = [
      {description: 'Minutely', rate: '150', currency: 'KWD'},
      {description: 'Hourly', rate: '5000', currency: 'KWD'},
      {description: 'Daily', rate: '30000', currency: 'KWD'},
      {description: 'Weekly', rate: '150000', currency: 'KWD'}
    ]

    Ride.findOne({vehicleId: body.vehicleName})
      .then(notFound(res))
      .then((ride) => {
        var duration, ratePerUnitTime, rideTotalAmount
        var count, currency
        const timeEnded = new Date()
        const timeStarted = new Date(ride.timeStarted)
        var seconds = Math.floor((timeEnded - (timeStarted)) / 1000)
        duration = Math.floor(seconds / 60)
        if (duration < 60) {
          count = card.filter(x => x.description === 'Minutely')
          currency = count[0].currency
          ratePerUnitTime = count[0].rate
          rideTotalAmount = duration * ratePerUnitTime
        } else if (duration >= 60 && duration < 1440) {
          count = card.filter(x => x.description === 'Hourly')
          currency = count[0].currency
          ratePerUnitTime = count[0].rate
          rideTotalAmount = (duration / 60) * ratePerUnitTime
        } else if (duration >= 1440 && duration < 10080) {
          count = card.filter(x => x.description === 'Daily')
          currency = count[0].currency
          ratePerUnitTime = count[0].rate
          rideTotalAmount = (duration / 1440) * ratePerUnitTime
        } else if (duration >= 10080 && duration < 43200) {
          count = card.filter(x => x.description === 'weekly')
          currency = count[0].currency
          ratePerUnitTime = count[0].rate
          rideTotalAmount = (duration / 10080) * ratePerUnitTime
        }
        console.log(rideTotalAmount)
        var newRide = {
          status: 'Completed',
          timeEnded: timeEnded,
          duration: duration,
          ratePerUnitTime: ratePerUnitTime,
          currency: currency,
          rideTotalAmount: rideTotalAmount,
          locationDropoffLat: body.userLat,
          locationdropOffLon: body.userLon
        }

        var newVehicle = {
          status: 'Available',
          lat: body.userLat,
          lng: body.userLon,
          loc: [body.userLat, body.userLon]
        }
        Vehicle.findById(body.vehicleName)
          .then((vehicle) => Object.assign(vehicle, newVehicle).save())
        Object.assign(ride, newRide).save()
        var response = {
          error: false,
          msg: 'Vehicle Successfully checked out. Ride Completed.',
          data: ride
        }

        res.status(200).send(response)
      })
      .catch(next)
  }
}


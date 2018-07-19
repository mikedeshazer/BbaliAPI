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

export const rent = ({user, bodymen: {body}, params}, res, next) => {
  if (!body.vehicleId) {
    res.status(500).send({error: 'Vehicle Id is required'})
  } else if (!body.paymentId) {
    res.status(500).send({error: 'Payment Id is required'})
  } else if (!body.rideType) {
    res.status(500).send({error: 'Type is required'})
  } else if (!body.fromShop) {
    res.status(500).send({error: 'fromShop is required'})
  } else {
    if (body.fromShop === 'false') {
      if (!body.lat) {
        res.status(500).send({error: 'User Latitude is required'})
      } else if (!body.lon) {
        res.status(500).send({error: 'User Longitude is required'})
      }
    }
    // TODO : Verify Payment Method of User
    Vehicle.findById(body.vehicleId)
      .then(notFound(res))
      .then((vehicle) => {
        if (vehicle.status === 'Available' || vehicle.status === '') {
          const ride = {
            userId: user,
            paymentMethodId: body.paymentId,
            vehicleId: vehicle,
            locationPickupLat: body.pickupLat,
            locationPickupLon: body.pickupLon,
            type: body.rideType,
            duration: body.duration,
            fromShop: body.fromShop,
            status: 'booked'
          }
          Ride.create(ride)
            .then((ride) => {
              Object.assign(vehicle, {status: 'Booked', occupiedByUserId: user}).save()
              if (ride.fromShop.toString() !== 'true') {
                const vehicleDelivery = {
                  userId: user,
                  rideId: ride,
                  pickup: [ride.vehicleId.lat, ride.vehicleId.lon],
                  drop: [body.lat, body.lon],
                  vehicleId: ride.vehicleId,
                  pickupLatitude: ride.vehicleId.lat,
                  pickupLongitude: ride.vehicleId.lon,
                  dropLatitude: body.lat,
                  dropLongitude: body.lon,
                  status: 'pending'
                }
                VehicleDelivery.create(vehicleDelivery)
                  .catch(next)
              }
              const final = {
                error: false,
                msg: 'Vehicle ' + vehicle.name + ' rented.',
                data: ride
              }
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

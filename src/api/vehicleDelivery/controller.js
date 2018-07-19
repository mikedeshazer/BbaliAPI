import { success, notFound, authorOrAdmin } from '../../services/response/'
import { VehicleDelivery } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  VehicleDelivery.create({ ...body, userId: user })
    .then((vehicleDelivery) => vehicleDelivery.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  VehicleDelivery.find(query, select, cursor)
    .populate('userId')
    .then((vehicleDeliveries) => vehicleDeliveries.map((vehicleDelivery) => vehicleDelivery.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  VehicleDelivery.findById(params.id)
    .populate('userId')
    .then(notFound(res))
    .then((vehicleDelivery) => vehicleDelivery ? vehicleDelivery.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  VehicleDelivery.findById(params.id)
    .populate('userId')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'userId'))
    .then((vehicleDelivery) => vehicleDelivery ? Object.assign(vehicleDelivery, body).save() : null)
    .then((vehicleDelivery) => vehicleDelivery ? vehicleDelivery.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  VehicleDelivery.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'userId'))
    .then((vehicleDelivery) => vehicleDelivery ? vehicleDelivery.remove() : null)
    .then(success(res, 204))
    .catch(next)

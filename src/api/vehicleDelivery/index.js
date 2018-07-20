import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export VehicleDelivery, { schema } from './model'

const router = new Router()
const { rideId, rideCreatedat, vehicleId, pickupLatitude, pickupLongitude, dropLatitude, dropLongitude, status, pickup, drop, deliveryUserId, deliveryStartTime, deliveryEndTime } = schema.tree

/**
 * @api {post} /vehicleDeliveries Create vehicle delivery
 * @apiName CreateVehicleDelivery
 * @apiGroup VehicleDelivery
 * @apiPermission user
 * @apiParam {String} userAuth user access token.
 * @apiParam rideId Vehicle delivery's rideId.
 * @apiParam rideCreatedat Vehicle delivery's rideCreatedat.
 * @apiParam vehicleId Vehicle delivery's vehicleId.
 * @apiParam pickupLatitude Vehicle delivery's pickupLatitude.
 * @apiParam pickupLongitude Vehicle delivery's pickupLongitude.
 * @apiParam dropLatitude Vehicle delivery's dropLatitude.
 * @apiParam dropLongitude Vehicle delivery's dropLongitude.
 * @apiParam status Vehicle delivery's status.
 * @apiParam pickup Vehicle delivery's pickup.
 * @apiParam drop Vehicle delivery's drop.
 * @apiParam deliveryUserId Vehicle delivery's deliveryUserId.
 * @apiParam deliveryStartTime Vehicle delivery's deliveryStartTime.
 * @apiParam deliveryEndTime Vehicle delivery's deliveryEndTime.
 * @apiSuccess {Object} vehicleDelivery Vehicle delivery's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Vehicle delivery not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ rideId, rideCreatedat, vehicleId, pickupLatitude, pickupLongitude, dropLatitude, dropLongitude, status, pickup, drop, deliveryUserId, deliveryStartTime, deliveryEndTime }),
  create)

/**
 * @api {get} /vehicleDeliveries Retrieve vehicle deliveries
 * @apiName RetrieveVehicleDeliveries
 * @apiGroup VehicleDelivery
 * @apiPermission user
 * @apiParam {String} userAuth user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} vehicleDeliveries List of vehicle deliveries.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /vehicleDeliveries/:id Retrieve vehicle delivery
 * @apiName RetrieveVehicleDelivery
 * @apiGroup VehicleDelivery
 * @apiPermission user
 * @apiParam {String} userAuth user access token.
 * @apiSuccess {Object} vehicleDelivery Vehicle delivery's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Vehicle delivery not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /vehicleDeliveries/:id Update vehicle delivery
 * @apiName UpdateVehicleDelivery
 * @apiGroup VehicleDelivery
 * @apiPermission user
 * @apiParam {String} userAuth user access token.
 * @apiParam rideId Vehicle delivery's rideId.
 * @apiParam rideCreatedat Vehicle delivery's rideCreatedat.
 * @apiParam vehicleId Vehicle delivery's vehicleId.
 * @apiParam pickupLatitude Vehicle delivery's pickupLatitude.
 * @apiParam pickupLongitude Vehicle delivery's pickupLongitude.
 * @apiParam dropLatitude Vehicle delivery's dropLatitude.
 * @apiParam dropLongitude Vehicle delivery's dropLongitude.
 * @apiParam status Vehicle delivery's status.
 * @apiParam pickup Vehicle delivery's pickup.
 * @apiParam drop Vehicle delivery's drop.
 * @apiParam deliveryUserId Vehicle delivery's deliveryUserId.
 * @apiParam deliveryStartTime Vehicle delivery's deliveryStartTime.
 * @apiParam deliveryEndTime Vehicle delivery's deliveryEndTime.
 * @apiSuccess {Object} vehicleDelivery Vehicle delivery's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Vehicle delivery not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ rideId, rideCreatedat, vehicleId, pickupLatitude, pickupLongitude, dropLatitude, dropLongitude, status, pickup, drop, deliveryUserId, deliveryStartTime, deliveryEndTime }),
  update)

/**
 * @api {delete} /vehicleDeliveries/:id Delete vehicle delivery
 * @apiName DeleteVehicleDelivery
 * @apiGroup VehicleDelivery
 * @apiPermission user
 * @apiParam {String} userAuth user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Vehicle delivery not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router

import {Router} from 'express'
import {middleware as query} from 'querymen'
import {middleware as body} from 'bodymen'
import {token} from '../../services/passport'
import {create, index, show, update, destroy, rent, nearBy, checkout} from './controller'
import {schema} from './model'

export Vehicle, {schema} from './model'

const router = new Router();
const {vehicleId, paymentId, rideType, fromShop, range} = "";
const {vehicleName, userLat, userLon, qrcodeIdentifier, name, type, currentStatus, lon, lat, description, occupiedByUserId, photoUrl, parkedAddress, parkedDescription, currentLockCode, chargedPercentageEstimate, make, year, model} = schema.tree

/**
 * @api {post} /vehicles Create vehicle
 * @apiName CreateVehicle
 * @apiGroup Vehicle
 * @apiPermission user
 * @apiParam {String} userAuth user access token.
 * @apiParam qrcodeIdentifier Vehicle's qrcodeIdentifier.
 * @apiParam name Vehicle's name.
 * @apiParam type Vehicle's type.
 * @apiParam currentStatus Vehicle's currentStatus.
 * @apiParam lon Vehicle's lon.
 * @apiParam lat Vehicle's lat.
 * @apiParam description Vehicle's description.
 * @apiParam occupiedByUserId Vehicle's occupiedByUserId.
 * @apiParam photoUrl Vehicle's photoUrl.
 * @apiParam parkedAddress Vehicle's parkedAddress.
 * @apiParam parkedDescription Vehicle's parkedDescription.
 * @apiParam currentLockCode Vehicle's currentLockCode.
 * @apiParam chargedPercentageEstimate Vehicle's chargedPercentageEstimate.
 * @apiParam make Vehicle's make.
 * @apiParam year Vehicle's year.
 * @apiParam model Vehicle's model.
 * @apiSuccess {Object} vehicle Vehicle's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Vehicle not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({required: true}),
  body({
    qrcodeIdentifier,
    name,
    type,
    currentStatus,
    lon,
    lat,
    description,
    occupiedByUserId,
    photoUrl,
    parkedAddress,
    parkedDescription,
    currentLockCode,
    chargedPercentageEstimate,
    make,
    year,
    model
  }),
  create)

router.post('/rent',
  token({required: true}),
  body({vehicleId, paymentId, rideType, fromShop, lat, lon}),
  rent)

/**
 * @api {get} /vehicles Retrieve vehicles
 * @apiName RetrieveVehicles
 * @apiGroup Vehicle
 * @apiPermission user
 * @apiParam {String} userAuth user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} vehicles List of vehicles.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({required: true}),
  query(),
  index)

/**
 * @api {get} /vehicles/:id Retrieve vehicle
 * @apiName RetrieveVehicle
 * @apiGroup Vehicle
 * @apiPermission user
 * @apiParam {String} userAuth user access token.
 * @apiSuccess {Object} vehicle Vehicle's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Vehicle not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({required: true}),
  show)

/**
 * @api {put} /vehicles/:id Update vehicle
 * @apiName UpdateVehicle
 * @apiGroup Vehicle
 * @apiPermission user
 * @apiParam {String} userAuth user access token.
 * @apiParam qrcodeIdentifier Vehicle's qrcodeIdentifier.
 * @apiParam name Vehicle's name.
 * @apiParam type Vehicle's type.
 * @apiParam currentStatus Vehicle's currentStatus.
 * @apiParam lon Vehicle's lon.
 * @apiParam lat Vehicle's lat.
 * @apiParam description Vehicle's description.
 * @apiParam occupiedByUserId Vehicle's occupiedByUserId.
 * @apiPar
 * 'am photoUrl Vehicle's photoUrl.
 * @apiParam parkedAddress Vehicle's parkedAddress.
 * @apiParam parkedDescription Vehicle's parkedDescription.
 * @apiParam currentLockCode Vehicle's currentLockCode.
 * @apiParam chargedPercentageEstimate Vehicle's chargedPercentageEstimate.
 * @apiParam make Vehicle's make.
 * @apiParam year Vehicle's year.
 * @apiParam model Vehicle's model.
 * @apiSuccess {Object} vehicle Vehicle's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Vehicle not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({required: true}),
  body({
    qrcodeIdentifier,
    name,
    type,
    currentStatus,
    lon,
    lat,
    description,
    occupiedByUserId,
    photoUrl,
    parkedAddress,
    parkedDescription,
    currentLockCode,
    chargedPercentageEstimate,
    make,
    year,
    model
  }),
  update)

/**
 * @api {delete} /vehicles/:id Delete vehicle
 * @apiName DeleteVehicle
 * @apiGroup Vehicle
 * @apiPermission user
 * @apiParam {String} userAuth user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Vehicle not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({required: true}),
  destroy)

router.post('/nearby',
  token({required: true}),
  body({lat, lon, range}),
  nearBy)

router.post('/checkout',
  token({required: true}),
  body({vehicleName, userLat, userLon}),
  checkout)

export default router

import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, unlockQR, start, lock,end, history,index1} from './controller'
import { rSchema } from './model'
export Ride, { rSchema } from './model'

const router = new Router()
const {rideId} = "";
const { timeStarted, type, duration, ratePerUnitTime, currency, timeEnded, paymentMethodID, status, rideTotal, locationPickupLon, locationPickupLat, locationdropOffLon, locationDropoffLat, loctionDropoffAddress } = rSchema.tree

/**
 * @api {post} /rides Create ride
 * @apiName CreateRide
 * @apiGroup Ride
 * @apiPermission user
 * @apiParam {String} userAuth user access token.
 * @apiParam timeStarted Ride's timeStarted.
 * @apiParam type Ride's type.
 * @apiParam duration Ride's duration.
 * @apiParam ratePerUnitTime Ride's ratePerUnitTime.
 * @apiParam currency Ride's currency.
 * @apiParam timeEnded Ride's timeEnded.
 * @apiParam paymentMethodID Ride's paymentMethodID.
 * @apiParam status Ride's status.
 * @apiParam rideTotal Ride's rideTotal.
 * @apiParam locationPickupLon Ride's locationPickupLon.
 * @apiParam locationPickupLat Ride's locationPickupLat.
 * @apiParam locationdropOffLon Ride's locationdropOffLon.
 * @apiParam locationDropoffLat Ride's locationDropoffLat.
 * @apiParam loctionDropoffAddress Ride's loctionDropoffAddress.
 * @apiSuccess {Object} ride Ride's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ride not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ timeStarted, type, duration, ratePerUnitTime, currency, timeEnded, paymentMethodID, status, rideTotal, locationPickupLon, locationPickupLat, locationdropOffLon, locationDropoffLat, loctionDropoffAddress }),
  create)

/**
 * @api {get} /rides Retrieve rides
 * @apiName RetrieveRides
 * @apiGroup Ride
 * @apiPermission user
 * @apiParam {String} userAuth user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} rides List of rides.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /rides/:id Retrieve ride
 * @apiName RetrieveRide
 * @apiGroup Ride
 * @apiPermission user
 * @apiParam {String} userAuth user access token.
 * @apiSuccess {Object} ride Ride's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ride not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /rides/:id Update ride
 * @apiName UpdateRide
 * @apiGroup Ride
 * @apiPermission user
 * @apiParam {String} userAuth user access token.
 * @apiParam timeStarted Ride's timeStarted.
 * @apiParam type Ride's type.
 * @apiParam duration Ride's duration.
 * @apiParam ratePerUnitTime Ride's ratePerUnitTime.
 * @apiParam currency Ride's currency.
 * @apiParam timeEnded Ride's timeEnded.
 * @apiParam paymentMethodID Ride's paymentMethodID.
 * @apiParam status Ride's status.
 * @apiParam rideTotal Ride's rideTotal.
 * @apiParam locationPickupLon Ride's locationPickupLon.
 * @apiParam locationPickupLat Ride's locationPickupLat.
 * @apiParam locationdropOffLon Ride's locationdropOffLon.
 * @apiParam locationDropoffLat Ride's locationDropoffLat.
 * @apiParam loctionDropoffAddress Ride's loctionDropoffAddress.
 * @apiSuccess {Object} ride Ride's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ride not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ timeStarted, type, duration, ratePerUnitTime, currency, timeEnded, paymentMethodID, status, rideTotal, locationPickupLon, locationPickupLat, locationdropOffLon, locationDropoffLat, loctionDropoffAddress }),
  update)

/**
 * @api {delete} /rides/:id Delete ride
 * @apiName DeleteRide
 * @apiGroup Ride
 * @apiPermission user
 * @apiParam {String} userAuth user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Ride not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

router.post('/unlockQR',
  token({ required: true }),
  body({ rideId }),
  unlockQR)

router.post('/start',
  token({ required: true }),
  body({ rideId }),
  start)

router.post('/lock',
  token({ required: true }),
  body({ rideId }),
  lock)

router.post('/end',
  token({ required: true }),
  body({ rideId }),
  end)

router.get('/history',
  token({ required: true }),
  index)

export default router

import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index } from './controller'
import { schema } from './model'
export Rateride, { schema } from './model'

const router = new Router()
const { rideId, vehicleName, starRating, textRating, userLat, userLon } = schema.tree

/**
 * @api {post} /raterides Create rateride
 * @apiName CreateRateride
 * @apiGroup Rateride
 * @apiPermission user
 * @apiParam {String} userAuth user access token.
 * @apiParam rideId Rateride's rideId.
 * @apiParam vehicleName Rateride's vehicleName.
 * @apiParam starRating Rateride's starRating.
 * @apiParam textRating Rateride's textRating.
 * @apiParam userLat Rateride's userLat.
 * @apiParam userLon Rateride's userLon.
 * @apiSuccess {Object} rateride Rateride's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Rateride not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ rideId, vehicleName, starRating, textRating, userLat, userLon }),
  create)

/**
 * @api {get} /raterides Retrieve raterides
 * @apiName RetrieveRaterides
 * @apiGroup Rateride
 * @apiPermission user
 * @apiParam {String} userAuth user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} raterides List of raterides.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

export default router

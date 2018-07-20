import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show } from './controller'
import { schema } from './model'
export VehicleReport, { schema } from './model'

const router = new Router()
const { vehicleId, message, type, userLatitude, userLongitude } = schema.tree

/**
 * @api {post} /vehicleReports Create vehicle report
 * @apiName CreateVehicleReport
 * @apiGroup VehicleReport
 * @apiPermission user
 * @apiParam {String} userAuth user access token.
 * @apiParam vehicleId Vehicle report's vehicleId.
 * @apiParam message Vehicle report's message.
 * @apiParam type Vehicle report's type.
 * @apiParam userLatitude Vehicle report's userLatitude.
 * @apiParam userLongitude Vehicle report's userLongitude.
 * @apiSuccess {Object} vehicleReport Vehicle report's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Vehicle report not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ vehicleId, message, type, userLatitude, userLongitude }),
  create)

/**
 * @api {get} /vehicleReports Retrieve vehicle reports
 * @apiName RetrieveVehicleReports
 * @apiGroup VehicleReport
 * @apiPermission user
 * @apiParam {String} userAuth user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} vehicleReports List of vehicle reports.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /vehicleReports/:id Retrieve vehicle report
 * @apiName RetrieveVehicleReport
 * @apiGroup VehicleReport
 * @apiPermission user
 * @apiParam {String} userAuth user access token.
 * @apiSuccess {Object} vehicleReport Vehicle report's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Vehicle report not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

export default router

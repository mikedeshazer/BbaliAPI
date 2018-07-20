import { Router } from 'express'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create } from './controller'
import { schema } from './model'
import {changeStatus} from '../user/controller'
export Charger, { schema } from './model'

const router = new Router()
const { email, userLat, userLon, address, description, capacity, status } = schema.tree

/**
 * @api {post} /chargers Create charger
 * @apiName CreateCharger
 * @apiGroup Charger
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam email Charger's email.
 * @apiParam userLat Charger's userLat.
 * @apiParam userLon Charger's userLon.
 * @apiParam address Charger's address.
 * @apiParam description Charger's description.
 * @apiParam capacity Charger's capacity.
 * @apiSuccess {Object} charger Charger's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Charger not found.
 * @apiError 401 user access only.
 */
router.post('/apply',
  token({ required: true }),
  body({ email, userLat, userLon, address, description, capacity }),
  create)

/**
 * @api {post} /chargers/status change charger user status
 * @apiName ChangeStatus
 * @apiGroup User
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiParam {String} status chargeruser's status.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 * @apiError 409 Email already registered.
 */
router.post('/status',
  token({required: true}),
  body({status}),
  changeStatus)

export default router

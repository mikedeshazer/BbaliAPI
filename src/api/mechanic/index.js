import { Router } from 'express'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create } from './controller'
import { schema } from './model'
import {changeStatus} from '../user/controller'
export Mechanic, { schema } from './model'

const router = new Router()
const { email, userLat, userLon, address, description, status } = schema.tree

/**
 * @api {post} /mechanics Create mechanic
 * @apiName CreateMechanic
 * @apiGroup Mechanic
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam email Mechanic's email.
 * @apiParam userLat Mechanic's userLat.
 * @apiParam userLon Mechanic's userLon.
 * @apiParam address Mechanic's address.
 * @apiParam description Mechanic's description.
 * @apiSuccess {Object} mechanic Mechanic's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Mechanic not found.
 * @apiError 401 user access only.
 */
router.post('/apply',
  token({ required: true }),
  body({ email, userLat, userLon, address, description }),
  create)

/**
 * @api {post} /mechanics/status change mechanics user status
 * @apiName ChangeStatus
 * @apiGroup User
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiParam {String} status mechanicsuser's status.
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

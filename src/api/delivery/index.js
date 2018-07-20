import { Router } from 'express'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create } from './controller'
import { schema } from './model'
import {changeStatus, showOpportunities} from '../user/controller'
export Delivery, { schema } from './model'

const router = new Router()
const { radius } = ''
const { email, userLat, userLon, address, description, status} = schema.tree

/**
 * @api {post} /deliveries Create delivery
 * @apiName CreateDelivery
 * @apiGroup Delivery
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam email Delivery's email.
 * @apiParam userLat Delivery's userLat.
 * @apiParam userLon Delivery's userLon.
 * @apiParam address Delivery's address.
 * @apiParam description Delivery's description.
 * @apiSuccess {Object} delivery Delivery's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Delivery not found.
 * @apiError 401 user access only.
 */
router.post('/apply',
  token({ required: true }),
  body({ email, userLat, userLon, address, description }),
  create)

/**
 * @api {post} /delivery/status change delivery user status
 * @apiName ChangeStatus
 * @apiGroup User
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiParam {String} status deliveryuser's status.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 * @apiError 409 Email already registered.
 */
router.post('/status',
  token({required: true}),
  body({status}),
  changeStatus)

router.post('/opportunities',
  token({required: true}),
  body({userLat, userLon, radius}),
  showOpportunities)

export default router

import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export RateCard, { schema } from './model'

const router = new Router()
const { distance, price } = schema.tree

/**
 * @api {post} /rate-cards Create rate card
 * @apiName CreateRateCard
 * @apiGroup RateCard
 * @apiPermission admin
 * @apiParam {String} userAuth admin access token.
 * @apiParam distance Rate card's distance.
 * @apiParam price Rate card's price.
 * @apiSuccess {Object} rateCard Rate card's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Rate card not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ distance, price }),
  create)

/**
 * @api {get} /rate-cards Retrieve rate cards
 * @apiName RetrieveRateCards
 * @apiGroup RateCard
 * @apiPermission admin
 * @apiParam {String} userAuth admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} rateCards List of rate cards.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /rate-cards/:id Retrieve rate card
 * @apiName RetrieveRateCard
 * @apiGroup RateCard
 * @apiPermission admin
 * @apiParam {String} userAuth admin access token.
 * @apiSuccess {Object} rateCard Rate card's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Rate card not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /rate-cards/:id Update rate card
 * @apiName UpdateRateCard
 * @apiGroup RateCard
 * @apiPermission admin
 * @apiParam {String} userAuth admin access token.
 * @apiParam distance Rate card's distance.
 * @apiParam price Rate card's price.
 * @apiSuccess {Object} rateCard Rate card's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Rate card not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ distance, price }),
  update)

/**
 * @api {delete} /rate-cards/:id Delete rate card
 * @apiName DeleteRateCard
 * @apiGroup RateCard
 * @apiPermission admin
 * @apiParam {String} userAuth admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Rate card not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router

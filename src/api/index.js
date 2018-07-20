import { Router } from 'express'
import user from './user'
import auth from './auth'
import vehicle from './vehicle'
import ride from './ride'
import rateride from './rateride'
import rateCard from './rate-card'
import vehicleDelivery from './vehicleDelivery'
import vehicleReport from './vehicleReport'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `userAuth` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `userAuth` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `userAuth` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.get('/', function (req, res) {
  res.send({'error': false, 'msg': 'Welcome to the Bbali API! Full documentation is available here: http://docs.bbali.io', 'data': []})
})
router.use('/users', user)
router.use('/auth', auth)
router.use('/vehicles', vehicle)
router.use('/rides', ride)
router.use('/raterides', rateride)
router.use('/rate-cards', rateCard)
router.use('/vehicleDeliveries', vehicleDelivery)
router.use('/vehicleReports', vehicleReport)

export default router

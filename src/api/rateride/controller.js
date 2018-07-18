import { success, notFound } from '../../services/response/'
import { Rateride } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Rateride.create(body)
    .then((rateride) => rateride.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Rateride.find(query, select, cursor)
    .then((raterides) => raterides.map((rateride) => rateride.view()))
    .then(success(res))
    .catch(next)

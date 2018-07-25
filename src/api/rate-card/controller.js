import { success, notFound } from '../../services/response/'
import { RateCard } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  RateCard.create(body)
    .then((rateCard) => rateCard.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  RateCard.find(query, select, cursor)
    .then((rateCards) => rateCards.map((rateCard) => rateCard.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  RateCard.findById(params.id)
    .then(notFound(res))
    .then((rateCard) => rateCard ? rateCard.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  RateCard.findById(params.id)
    .then(notFound(res))
    .then((rateCard) => rateCard ? Object.assign(rateCard, body).save() : null)
    .then((rateCard) => rateCard ? rateCard.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  RateCard.findById(params.id)
    .then(notFound(res))
    .then((rateCard) => rateCard ? rateCard.remove() : null)
    .then(success(res, 204))
    .catch(next)

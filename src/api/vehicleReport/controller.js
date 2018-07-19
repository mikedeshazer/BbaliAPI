import { success, notFound } from '../../services/response/'
import { VehicleReport } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  VehicleReport.create({ ...body, userId: user })
    .then((vehicleReport) => vehicleReport.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  VehicleReport.find(query, select, cursor)
    .populate('userId')
    .then((vehicleReports) => vehicleReports.map((vehicleReport) => vehicleReport.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  VehicleReport.findById(params.id)
    .populate('userId')
    .then(notFound(res))
    .then((vehicleReport) => vehicleReport ? vehicleReport.view() : null)
    .then(success(res))
    .catch(next)

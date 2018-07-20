import { success, notFound } from '../../services/response/'
import { Mechanic } from '.'
import {User} from "../user";

export const create = ({ user, bodymen: { body } }, res, next) =>{
  body.isMechanic = false
  body.isApproved = false
  body.status = 'off'
  console.log('body:', body)
  User.create(body)
    .then((user) => {
      const final = {
        error: false,
        msg: 'Application Sent',
        data: {'timstamp': user.createdAt}
      }
      res.status(200).send(final)
    })
    .catch((err) => {
      /* istanbul ignore else */
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).json({
          valid: false,
          param: 'email',
          message: 'email already registered'
        })
      } else {
        next(err)
      }
    })
}

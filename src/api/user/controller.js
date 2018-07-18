import { success, notFound } from '../../services/response/'
import { User } from '.'
import { bitcoin } from 'bitcoinjs-lib';

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  User.count(query)
    .then(count => User.find(query, select, cursor)
      .then(users => ({
        rows: users.map((user) => user.view()),
        count
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.view() : null)
    .then(success(res))
    .catch(next)

export const showMe = ({ user }, res) =>
  res.json(user.view(true))

export const create = ({ bodymen: { body } }, res, next) => {
  var bitcoin = require("bitcoinjs-lib");
  var keyPair = bitcoin.ECPair.makeRandom();
  var address = keyPair.getAddress();
  var pkey = keyPair.toWIF();
  body.bitcoinAddress = address;
  body.bitcoinKey = pkey;
  var ethers = require('ethers');
  var privateKey = "0x0123456789012345678901234567890123456789012345678901234567890123";
  var wallet = ethers.Wallet.createRandom();

  console.log("Address: " + wallet.address);
   body.etherKey = privateKey;
    body.etherAddress = wallet.address;

  User.create(body)
    .then((user) => user.view(true))
    .then(success(res, 201))
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

export const createCharger = ({ bodymen: { body } }, res, next) => {
  body.isCharger = false;
  body.isApproved = false;
  body.status = "off";
  console.log("body:",body);
  User.create(body)
    .then((user) => user.chargerView(true))
    .then(success(res, 201))
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

export const changeStatus = ({ user, bodymen: { body }, params }, res, next) => {
  if(!params.id){
    res = "No Id to change Status"
  }
  else{
    User.findById(params.id)
      .populate('user')
      .then(notFound(res))
      .then((charger) => {
        if(charger.isApproved.toString() === 'true') {
          Object.assign(charger, body).save();
          res.status(200).send({data: charger.chargerView(true)});
        }
        else{
          body.status = 'off';
          Object.assign(charger, body).save();
          res.status(200).send({error: "YOU_ARE_NOT_APPROVED_BY_ADMIN_YET"});
        }
      })
      .catch(next)
  }
}

export const update = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isAdmin = user.role === 'admin'
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate && !isAdmin) {
        res.status(401).json({
          valid: false,
          message: 'You can\'t change other user\'s data'
        })
        return null
      }
      return result
    })
    .then((user) => user ? Object.assign(user, body).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const updatePassword = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate) {
        res.status(401).json({
          valid: false,
          param: 'password',
          message: 'You can\'t change other user\'s password'
        })
        return null
      }
      return result
    })
    .then((user) => user ? user.set({ password: body.password }).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.remove() : null)
    .then(success(res, 204))
    .catch(next)

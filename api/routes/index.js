module.exports = app => {
  app.use('/authorization', require('../controllers/user.controller'));
};

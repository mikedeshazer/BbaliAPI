module.exports = app => {
    app.use('/user', require('api/controllers/user/'));
}
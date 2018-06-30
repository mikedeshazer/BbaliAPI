const isDev = require('isdev');

if(isDev) {
  process.env.NODE_ENV = 'development';
} else {
  process.env.NODE_ENV = 'production';
}

require('rootpath')();

const throng = require('throng'),
  config = require('config'),
  express = require('./api/core/express'),
  chalk = require('chalk'),
  logger = require('./api/helpers/logger'),
  mongoose = require('mongoose');

  mongoose.Promise = global.Promise;
  mongoose.connect(config.db.connectionString, { useMongoClient: true });

  const start = (workerId, callback) => {
    const app = express.init();

    app.listen(config.port, () => {
      (!workerId || workerId === 1) && logger.info(chalk.green(
        "\n ------------------------------------------------------\r\n",
        "The server is running at " + config.host + "/\n",
        "Environment:\t\t" + process.env.NODE_ENV + "\n",
        "Port:\t\t\t" + config.port + "\n",
        "Database:\t\t" + config.db.connectionString + "\n",
        "------------------------------------------------------\n"));
      if (callback) callback(app, config);
    });
  };

const webConcurrency = process.env.NODE_ENV === 'production' ? config.webConcurrency : 1;
throng({
  workers: webConcurrency,
  master () {
    logger.info(chalk.magenta('Master cluster started, setting up ' + webConcurrency + ' worker(s) ...'));
  },
  start (id) {
    logger.info(chalk.yellow('Worker #' + id + ' started'));
    start(id);
    process.on('SIGTERM', () => {
      logger.info(chalk.cyan('Worker ' + id + ' exiting ...'));
      process.exit();
    });
  }
});



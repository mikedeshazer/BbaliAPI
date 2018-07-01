const _ = require('lodash'),
      chalk = require('chalk'),
      defaultConfig = require('./env/default'),
      prodConfig = require('./env/production'),
      devConfig = require('./env/development');

const loadConfig = () => {
  let envConfig;
  switch (process.env.NODE_ENV) {
    case 'production':
      envConfig = prodConfig; break;
    case 'development':
      envConfig = devConfig; break;
    default:
      console.warn(chalk.yellow('+ WARN: Unknown environment setting - ' + process.env.NODE_ENV +
        '? Using development environment instead.'));
      envConfig = devConfig;
  }
  return _.merge(defaultConfig, envConfig);
};

module.exports = loadConfig();

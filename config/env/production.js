const connectionString = process.env.SITE_MONGO_URI || "mongodb://bblia-user:Mlab-database111@ds125021.mlab.com:25021/bblia",
  format = process.env.LOG_FORMAT || 'combined',
  directoryPath = process.env.LOG_DIR_PATH || process.cwd(),
  fileName1 = process.env.LOG_FILE || 'access.log',
  active = process.env.LOG_ROTATING_ACTIVE === 'true' ? true : false, // activate to use rotating logs
  fileName2 = process.env.LOG_ROTATING_FILE || 'access-%DATE%.log', // if rotating logs are active, this fileName setting will be used
  frequency = process.env.LOG_ROTATING_FREQUENCY || 'daily',
  verbose = process.env.LOG_ROTATING_VERBOSE === 'true' ? true : false;

module.exports = {
  db: {
    connectionString: connectionString
  },
  serverUrl: "https://bblia.herokuapp.com",
  log: {
    format: format,
    options: {
      _stream: {
        directoryPath: directoryPath,
        fileName: fileName1,
        rotatingLogs: { // for more info on rotating logs - https://github.com/holidayextras/file-stream-rotator#usage
          active: active, // activate to use rotating logs
          fileName: fileName2, // if rotating logs are active, this fileName setting will be used
          frequency: frequency,
          verbose: verbose
        }
      }
    }
  },
  errPort1: 500,
  success: 200,
  failed: 400
};

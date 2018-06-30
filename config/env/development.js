const connectionString = process.env.SITE_MONGO_URI || "mongodb://127.0.0.1:27017/bbali";

module.exports = {
  db: {
    connectionString: connectionString
  },
  serverUrl: "http://127.0.0.1:3000/",
  log: {
    format: 'dev',
    options: {}
  },
  errPort1: 500,
  success: 200,
  failed: 400
};

const path = require('path'),
    config = require('config'),
    express = require('express'),
    morgan = require('morgan'),
    logger = require('./logger'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    helmet = require('helmet'),
    cors = require('cors'),
    resHandler = require('../helpers/res-handler'),
    errorMsg = require('../helpers/error-msg'),
    compression = require('compression'),
    setupApiRoutes = require('../routes');

/**
 * Initialize local letiables
 */
const initLocalVariables = app => {
  // Passing the request url to environment locals
  app.use((req, res, next) => {
    res.locals.host = req.protocol + '://' + req.hostname;
    res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
    next();
  });
};

/**
 * Initialize application middleware
 */
const initMiddleware = app => {
  // Showing stack errors
  app.set('showStackError', true);

  // Gzip-compression
  app.use(compression());

  // CORS
  app.use(cors());

  // Enable logger (morgan)
  app.use(morgan(logger.getFormat(), logger.getOptions()));

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(methodOverride());

  // Add the cookie parser
  app.use(cookieParser());

};

/**
 * Configure Helmet headers configuration
 */
const initHelmetHeaders = app => {
  // Use helmet to secure Express headers
  const SIX_MONTHS = 15778476000;
  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.use(helmet.hsts({
    maxAge: SIX_MONTHS,
    includeSubdomains: true,
    force: true
  }));
  app.use(helmet.hidePoweredBy());
};

/**
 * Configure the server routes
 */
const initServerRoutes = app => {

  // API routes
  setupApiRoutes(app);

};

/**
 * global error handling
 */
const handleErrors = app => {
  app.use((err, req, res, next) => {
      if (err instanceof SyntaxError && err.status === config.failed && 'body' in err) {
        resHandler(res, config.failed, true, errorMsg.badInput);
      } 
  });
}

const urlError = app => {
  app.use((req, res) => {
    resHandler(res, config.failed, true, errorMsg.invalidURL);
  });
}

/**
 * Initialize the Express application
 */
module.exports.init = () => {
  // Initialize express app
  const app = express();

  // Initialize local Variables
  initLocalVariables(app);

  // Initialize Express middleware
  initMiddleware(app);

  // Initialize Helmet security headers
  initHelmetHeaders(app);

  // Initialize modules server routes
  initServerRoutes(app);
  
  // Invalid URL handling
  urlError(app);

  // global error handling
  handleErrors(app);

  return app;
};

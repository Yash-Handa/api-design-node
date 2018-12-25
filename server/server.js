var express = require('express');
var app = express();
var api = require('./api/api');
const err = require('./middleware/globalErrorHandler');

// setup the app middleware (global once)
require('./middleware/appMiddleware')(app);

// setup the api
app.use('/api', api);

// set up global error handling
app.use(err());

// export the app for testing
module.exports = app;

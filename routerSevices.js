var express = require('express'),
    app = express;


var routesActors = require('./api/routes/actorsRoutes');
var routesApplications = require('./api/routes/applicationsRoutes');
var routesTrips = require('./api/routes/tripRoutes');



module.exports = routesActors(app), routesApplications(app), routesTrips(app);

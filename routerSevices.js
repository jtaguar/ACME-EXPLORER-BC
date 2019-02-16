var express = require('express'),
    app = express();

var routesActors = require('./API/routes/actorsRoutes');
var routesApplications = require('./API/routes/applicationsRoutes');
var routesTrips = require('./API/routes/tripsRoutes');


module.exports = app, routesActors(app), routesApplications(app), routesTrips(app);
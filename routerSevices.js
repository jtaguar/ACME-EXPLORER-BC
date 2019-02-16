var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var routesActors = require('./API/routes/actorsRoutes');
var routesApplications = require('./API/routes/applicationsRoutes');
var routesTrips = require('./API/routes/tripsRoutes');

module.exports = app, routesActors(app), routesApplications(app), routesTrips(app);
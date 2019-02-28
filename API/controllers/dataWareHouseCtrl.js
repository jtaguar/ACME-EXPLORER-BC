
var async = require("async");
var mongoose = require('mongoose'),
    DataWareHouse = mongoose.model('DataWareHouse'),
    Trips = mongoose.model('Trips'),
    Applications = mongoose.model('Applications');

exports.list_all_indicators = function (req, res) {
    console.log('Requesting indicators');

    DataWareHouse.find().sort("-computationMoment").exec(function (err, indicators) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(indicators);
        }
    });
};

exports.last_indicator = function (req, res) {

    DataWareHouse.find().sort("-computationMoment").limit(1).exec(function (err, indicators) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(indicators);
        }
    });
};

var CronJob = require('cron').CronJob;
var CronTime = require('cron').CronTime;

//'0 0 * * * *' una hora
//'*/30 * * * * *' cada 30 segundos
//'*/10 * * * * *' cada 10 segundos
//'* * * * * *' cada segundo
var rebuildPeriod = '*/10 * * * * *';  //El que se usará por defecto
var computeDataWareHouseJob;

exports.rebuildPeriod = function (req, res) {
    console.log('Updating rebuild period. Request: period:' + req.query.rebuildPeriod);
    rebuildPeriod = req.query.rebuildPeriod;
    computeDataWareHouseJob.setTime(new CronTime(rebuildPeriod));
    computeDataWareHouseJob.start();

    res.json(req.query.rebuildPeriod);
};

function createDataWareHouseJob() {
    computeDataWareHouseJob = new CronJob(rebuildPeriod, function () {

        var new_dataWareHouse = new DataWareHouse();
        console.log('Cron job submitted. Rebuild period: ' + rebuildPeriod);
        async.parallel([
            infoTripbyManager,
            infoApplicationsbyTrip,
            infoPriceofTrips,
            ratioApplicationsStatus,
        ], function (err, results) {
            if (err) {
                console.log("Error computing datawarehouse: " + err);
            }
            else {
                console.log("Resultados obtenidos por las agregaciones: "
                    + JSON.stringify(results));
                new_dataWareHouse.infoTripbyManager = results[0];
                new_dataWareHouse.infoApplicationsbyTrip = results[1];
                new_dataWareHouse.infoPriceofTrips = results[2];
                new_dataWareHouse.ratioApplicationsStatus = results[3];
                new_dataWareHouse.rebuildPeriod = rebuildPeriod;

                new_dataWareHouse.save(function (err, datawarehouse) {
                    if (err) {
                        console.log("Error saving datawarehouse: " + err);
                    }
                    else {
                        console.log("new DataWareHouse succesfully saved. Date: "
                            + new Date());
                    }
                });
            }
        });
    }, null, true, 'Europe/Madrid');
}

module.exports.createDataWareHouseJob = createDataWareHouseJob;


function infoTripbyManager(callback) {
    Trips.aggregate([
        //la agregacion despues de que este bien hecha...
    ], function (err, res) {
        callback(err, res[0]/* .infoTripbyManager*/)
    });
};

function infoApplicationsbyTrip(callback) {
    Applications.aggregate([
        //la agregacion  despues de que este bien hecha...
    ], function (err, res) {
        callback(err, res[0]/*.infoApplicationsbyTrip */)
    });
};

function infoPriceofTrips(callback) {
    Trips.aggregate([
        //la agregacion  despues de que este bien hecha...
    ], function (err, res) {
        callback(err, res[0]/*.infoPriceofTrips */)
    });
};

function ratioApplicationsStatus(callback) {
    Applications.aggregate([
        {
            $facet: {
                totalApplications: [
                    { $group: { _id: null, totalapplicationsTotals: { $sum: 1 } } }
                ],
                groups: [{ $group: { _id: "$status", total: { $sum: 1 } } }],
            }
        },
        {
            $project: {
                _id: 0,
                groupsTotal: "$groups",
                totalApplications: "$totalApplications.totalapplicationsTotals"
            }
        },
        { $unwind: "$totalApplications" },
        { $unwind: "$groupsTotal" },
        {
            $project: {
                _id: 0,
                status: "$groupsTotal._id",
                ratio: { $divide: ["$groupsTotal.total", "$totalApplications"] }
            }
        }
    ], function (err, res) {
        callback(err, res[0]/*.ratioApplicationsStatus */)
    });
};
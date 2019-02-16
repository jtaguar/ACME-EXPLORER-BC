'use strict';
//              Applications
var mongoose = require('mongoose'),
    Application = mongoose.model('Applications');

exports.create_an_application = function (req, res) {
    //Check if the user is an explorer and if not: res.status(403); "an access token is valid, but requires more privileges"
    var new_application = new Application(req.body);
    new_application.save(function (err, application) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(application);
        }
    });
};

exports.search_applications = function (req, res) {
    //Check if status param exists (status: req.query.status)  
    Application.find(
        // { status: req.params.status },
        function (err, applications) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(applications);
            }
        });

    console.log('Searching an application depending on params');
    // res.send('Application returned from the application search');
};


exports.update_an_application = function (req, res) {
    Application.findOneAndUpdate(
        { _id: req.params.applicationId },
        req.body,
        { new: true },
        function (err, application) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(application);
            }
        });
};

exports.delete_an_application = function (req, res) {
    Application.deleteOne(
        { _id: req.params.applicationId },
        function (err, application) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({ message: 'Application successfully deleted' });
            }
        });
};

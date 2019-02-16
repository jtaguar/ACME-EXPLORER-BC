'use strict';
//             ACTOR 
var mongoose = require('mongoose'),
  Actor = mongoose.model('Actors');

exports.create_an_actor = function (req, res) {
  console.log((req.body));
  var new_actor = new Actor(req.body);
  new_actor.save(function (err, actor) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(actor);
    }
  });
};

exports.update_an_actor = function (req, res) {
  /*
  Check that the user is the proper actor and if not: res.status(403);
   "an access token is valid, but requires more privileges"
  */
  console.log((req.body));
  Actor.findOneAndUpdate({ _id: req.params.actorId }, req.body, { new: true }, function (err, actor) {
    if (err) {
      res.send(err);
    } else {
      res.json(actor);
    }
  });
};
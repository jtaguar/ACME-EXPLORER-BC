'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const dateFormat = require('dateformat');


const generate = require('nanoid/generate');


var stagechema = new Schema({
    title: {
        type: String,
        required: 'Kindly enter the title of the Stage'
    },
    description: {
        type: String,
        required: 'Kindly enter the description of the Stage'
    },
    price: {
        type: Number,
        default: 0.00
    },
    created: {
        type: Date,
        default: Date.now
    }
}, { strict: false });

var TripSchema = new Schema({
    ticker: {
        type: String,
        //required: 'Kindly enter the ticker of the Trip',
        unique:true,
        //This validation does not run after middleware pre-save
        validate: {
           validator: function(v) {
               return /\d{6}-\w{6}/.test(v);
           },
           message: 'ticker is not valid!, Pattern("\d(6)-\w(6)")'
         }
    },
    title: {
        type: String,
        required: 'Kindly enter the title of the Trip'
    },
    description: {
        type: String,
        required: 'Kindly enter the description of the Trip'
    },
    price: {
        type: Number
        
    },
    list_requirements: {
        type: [String] //['adios','hola']
    },
    date_start: {
        type: Date,
        required: 'Kindly enter the start of the Trip'
    },
    date_end: {
        type: Date,
        required: 'Kindly enter the end of the Trip'
    },
    picture: [{
        data: Buffer, contentType: String
    }],
    stage: [stagechema],
    created: {
        type: Date,
        default: Date.now
    }
}, { strict: false });

TripSchema.pre('save', function(callback) {
    var new_trip = this;
    var date = new Date;
    var day=dateFormat(new Date(), "yymmdd");
  
    var generated_ticker = [day, generate('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 4)].join('-')
    new_trip.ticker = generated_ticker;
    callback();
  });

module.exports = mongoose.model('Trips', TripSchema);
module.exports = mongoose.model('Stages', stagechema);

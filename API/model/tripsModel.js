'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
        required: 'Kindly enter the ticker of the Trip',
        unique:true
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
        [dateValidation,
            'Start date must be less than End_date']
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

function dateValidation (value){

    return this.date_start <= value;
}
module.exports = mongoose.model('Trips', TripSchema);
module.exports = mongoose.model('Stages', stagechema);

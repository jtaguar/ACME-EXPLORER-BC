'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TripSchema = new Schema({
    ticker: {
        type: String,
        required: 'Kindly enter the ticker of the Category'
    },
    title: {
        type: String,
        required: 'Kindly enter the title of the Category'
    },
    description: {
        type: String,
        required: 'Kindly enter the description of the Trip'
    },
    price: {
        type: Number
    },
    list_requirements: {
        type: Array,
        required: ''
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

var stagechema = new Schema({
    title: {
        type: String,
        required: 'Kindly enter the title of the Category'
    },
    description: {
        type: String,
        required: 'Kindly enter the description of the Trip'
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

module.exports = mongoose.model('Items', ItemSchema);
module.exports = mongoose.model('Categories', TripSchema);

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActorSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the actor name'
    },
    surname: {
        type: String,
        required: 'Kindly enter the actor surname'
    },
    email: {
        type: String,
        required: 'Kindly enter the actor email',
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        required: 'Kindly enter the actor password'
    },
    phone: {
        type: String,
        required: 'Kindly enter the phone number'
    },
    address: {
        type: String
    },
    role: [{
        type: String,
        required: 'Kindly enter the user role(s)',
        enum: ['ADMINISTRATOR', 'MANAGER', 'EXPLORER']
    }],
    created: {
        type: Date,
        default: Date.now
    }
},
    { strict: false }
);

module.exports = mongoose.model('Actors', ActorSchema);
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


   // Custom validation for email
   ActorSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'E-mail invalido.');



module.exports = mongoose.model('Actors', ActorSchema);
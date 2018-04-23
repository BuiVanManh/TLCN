const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = function (email) {
    if (!email) {
        return false;
    } else {
        if (email.length < 5 || email.length > 30) {
            return false;
        } else {
            return true;    
        }
    }
};

let validEmailChecker = function (email) {
    if (!email) {
        return false;
    } else {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
};

// Array of Email Validators
const emailValidators = [
    // First Email Validator
    {
        validator: emailLengthChecker,
        message: 'E-mail must be at least 5 characters but no more than 30'
    },
    // Second Email Validator
    {
        validator: validEmailChecker,
        message: 'Must be a valid e-mail'
    }
];

const clientModelSchema = new Schema({
    fullname: String,
    email: { type: String, lowercase: true, trim: true, validate: emailValidators },
    phonenumber: String,
    job: String,
    skill: String,
    event: { type: Schema.ObjectId, ref: 'EventModel' }
});

const ClientModel = mongoose.model('ClientModel', clientModelSchema);

module.exports = ClientModel;

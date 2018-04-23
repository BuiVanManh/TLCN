const EventModel = require('../models/EventModel');
const ClientModel = require('../models/ClientModel');
const config = require('../config/db');

const addClient = function (req, res) {
    if (!req.body.email) {
        res.json({ success: false, message: 'You must enter your email!' });
    } else {
        if (!req.body.fullname) {
            res.json({ success: false, message: 'You must enter your full name!' });
        } else {
            if (!req.body.phonenumber) {
                res.json({ success: false, message: 'You must enter your phone number!' });
            } else {
                if (!req.body.job) {
                    res.json({ success: false, message: 'You must enter your job!' });
                } else {
                    if(!req.body.skill) {
                        res.json({ success: false, message: 'You must enter your skill!' });
                    } else {
                        let client = new ClientModel({
                            email: req.body.email.toLowerCase(),
                            fullname: req.body.fullname,
                            phonenumber: req.body.phonenumber,
                            job: req.body.job,
                            skill: req.body.skill,
                            event: req.body.event,
                        });
                        client.save(function (err) {
                            if (err) {
                                if (err.errors.email) {
                                    res.json({ success: false, message: err.errors.email.message });
                                } else {
                                    res.json({ success: false, message: 'Can not checkin, error by: ', err });
                                }
                            } else {
                                res.json({ success: true, message: 'You checked succesfully!' });
                                return;
                            }
                        });
                    }
                }
            }
        }
    }
}

const getClientByEvent = function(req, res){
    if (!req.params.id) {
        res.json({ success: false, message: 'No event ID was provided.' });
    } else {
        EventModel.findOne({ _id: req.params.id }, (err, event) => {
            if (err) {
                res.json({ success: false, message: 'Not a valid event id' }); // Return error message
            } else {
                if (!event) {
                    res.json({ success: false, message: 'event not found.' });
                } else {
                    ClientModel.find({event: req.params.id}, function(err, clients) {
                        if(err){
                            res.json({success: false, message: 'Error: ' + err});
                        }else{
                            if(!clients){
                                res.json({success: false, message: 'Null'});
                            }else{
                                var count = 0;
                                count = clients.length;
                                res.json({success: true, countclients: count, listClients: clients});
                            }
                        }
                    });
                }
            }
        });
    }
};

const checkEmail = function (req, res) {
    if (!req.params.email) {
        res.json({ success: false, massage: 'E-mail chưa nhập' });
    } else {
        console.log(req.params.email);
        ClientModel.findOne({ email: req.params.email }, function (err, user) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                res.json({ success: true, message: 'E-mail này hợp lệ' });
            }
        });
    }
};

const getSingleClient = function(req, res){
    if (!req.params.id) {
        res.json({ success: false, message: 'No Client ID was provided.' });
    } else {
        ClientModel.findOne({ _id: req.params.id }, (err, client) => {
            if (err) {
                res.json({ success: false, message: 'Not a valid client id' }); // Return error message
            } else {
                if (!client) {
                    res.json({ success: false, message: 'client not found.' });
                } else {
                    res.json({ success: true, client: client });
                }
            }
        });
    }
}

module.exports = {
    getClientByEvent,
    addClient,
    checkEmail,
    getSingleClient,
}
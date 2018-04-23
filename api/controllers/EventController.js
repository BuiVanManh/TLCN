const EventModel = require('../models/EventModel');
const UserModel = require('../models/UserModel');
const config = require('../config/db');

var addEvent = function(req, res){
    if (!req.body.image) {
        res.json({ success: false, message: 'You need to add your image' });
    } else {
        if (!req.body.title) {
            res.json({ success: false, message: 'You need to add title' });
        } else {
            if (!req.body.description) {
                res.json({ success: false, message: 'You need to add description' });
            }
            else {
                if(!req.body.start_date) {
                    res.json({ success: false, message: 'You need to add start-date' });
                }
                else {
                    if(!req.body.end_date){
                        res.json({ success: false, message: 'You need to add end-date' });
                    }
                    else {
                        if(!req.body.location){
                            res.json({ success: false, message: 'You need to add location' });
                        }
                        else {
                            if(!req.body.number){
                                res.json({ success: false, message: 'You need to add the number of participants' });
                            }
                            else {
                                let eventmodel = new EventModel({
                                    image: req.body.image,
                                    title: req.body.title,
                                    description: req.body.description,
                                    create_date: req.body.create_date,
                                    start_date: req.body.start_date,
                                    end_date: req.body.end_date,
                                    location: req.body.location,
                                    number: req.body.number,
                                    employee: req.body.employee,
                                    game: req.body.game,
                                });
                                eventmodel.save(function (err) {
                                    if (err) {
                                        res.json({ success: false, message: err });
                                    } else {
                                        res.json({ success: true, message: 'Success!' });
                                    }
                                });
                            }
                        }
                    }
                }
            }
        }
    }
};

// Update by id
var editEvent = function(req, res){
    if (!req.body.id) {
        res.json({ success: false, message: 'No event ID was provided.' });
    } else {
        EventModel.findOne({ _id: req.body.id }, (err, event) => {
            if (err) { 
                res.json({ success: false, message: 'Not a valid event id' });
            }
            else {
                if (!event) {
                    res.json({ success: false, message: 'event was not found.' });
                } else {
                    event.image = req.body.image,
                    event.title = req.body.title,
                    event.description = req.body.description,
                    event.create_date = req.body.create_date,
                    event.start_date = req.body.start_date,
                    event.end_date = req.body.end_date,
                    event.location = req.body.location,
                    event.number = req.body.number,
                    event.employee = req.body.employee,
                    event.game = req.body.game,
                    event.save((err) => {
                        if(err){
                            res.json({success: false, message: err});
                        } else {
                            res.json({ success: true, message: 'event had updated!' });
                        }
                    });
                }
            }
        });
    }
};

// Delete by id
var deleteEvent = function(req, res) {
    if (!req.params.id) {
        res.json({ success: false, message: 'No event id provided' });
    } else {
        EventModel.findOne({ _id: req.params.id }, (err, event) => {
            if (err) { 
                res.json({ success: false, message: 'Invalid id'});
            }
            else {
                if (!event) {
                    res.json({ success: false, message: 'event was not found!' });
                } else {
                    event.remove((err) => {
                        if(err){
                            res.json({ success: false, message: 'can not delete this event' }); 
                        } else {
                            res.json({ success: true, message: 'event had been deleted!' });
                        }
                    });
                }
            }
        });
    }
};

const getAllEvents = function(req, res){
    EventModel.find({}).populate({path: 'employee', model: 'UserModel'}).sort({create_date: -1}).exec(function(err, events){
        if(err){
            res.json({success: false, message: 'Error: ' + err});
        }else{
            if(!events){
                res.json({success: false, message: 'Null'});
            }else{
                var count = 0;
                count = events.length;
                res.json({success: true, countevents: count, listEvents: events});
            }
        }
    });
};

const getTop6Events = function(req, res){
    EventModel.find({}).populate({
        path: 'employee', 
        model: 'UserModel'
    }).sort({create_date: -1}).limit(6).exec(function(err, events){
        if(err){
            res.json({success: false, message: 'Error: ' + err});
        }else{
            if(!events){
                res.json({success: false, message: 'Null'});
            }else{
                var count = 0;
                count = events.length;
                res.json({success: true, countevents: count, listEvents: events});
            }
        }
    });
};

const getSingleEvent = function(req, res){
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
                    res.json({ success: true, event: event });
                }
            }
        });
    }
};

module.exports = {
    addEvent,
    editEvent,
    deleteEvent,
    getAllEvents,
    getTop6Events,
    getSingleEvent
}
const ReportModel = require('../models/ReportModel');

const config = require('../config/db');

var addReport = function (req, res) {
    if (!req.body.username) {
        res.json({ success: false, message: 'You need to add username' });
    } else {
        if (!req.body.email) {
            res.json({ success: false, message: 'You need to add email' });
        } else { 
            if (!req.body.phone) {
                res.json({ success: false, message: 'You need to add phone number' });
            } else {
                if(!req.body.content) {
                    res.json({ success: false, message: 'You need to add feedback content' });
                } else {
                    let reportmodel = new ReportModel({
                        username: req.body.username,
                        email: req.body.email,
                        phone: req.body.phone,
                        content: req.body.content,
                        event: req.body.event,
                    });
                    reportmodel.save(function (err) {
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
    
};

var editReport = function (req, res) {
    if (!req.body.id) {
        res.json({ success: false, message: 'No report ID was provided.' });
    } else {
        ReportModel.findOne({ _id: req.body.id }, (err, game) => {
            if(err) {
                res.json({ success: false, message: 'Not a valid report id' });
            } else {
                if (!report) {
                    res.json({ success: false, message: 'report was not found.' });
                } else { 
                    report.username = req.body.username,
                    report.email = req.body.email,
                    report.phone = req.body.phone,
                    report.email = req.body.email,
                    report.content = req.body.content,
                    report.save((err) => { 
                        if(err){
                            res.json({success: false, message: err});
                        } else {
                            res.json({ success: true, message: 'report had updated!' });
                        }
                    });
                }
            }
        });
    }
};

var deleteReport = function (req, res) {
    if (!req.params.id) {
        res.json({ success: false, message: 'No game id provided' });
    } else {
        ReportModel.findOne({ _id: req.params.id }, (err, report) => {
            if (err) {
                res.json({ success: false, message: 'Invalid id' });
            } else {
                if (!report) {
                    res.json({ success: false, messasge: 'This report was not found!' });
                } else {
                    report.remove((err) => {
                        if (err) {
                            res.json({ success: false, message: 'Can not delete this report' });
                        } else {
                            res.json({ success: true, message: 'Report had been deleted!' });
                        }
                    });
                }
            }
        });
    }
};

const getAllReports = function(req, res){
    ReportModel.find({}).populate({path: 'event', model: 'EventModel'}).exec(function(err, reports){
        if(err){
            res.json({success: false, message: 'Error: ' + err});
        }else{
            if(!reports){
                res.json({success: false, message: 'Null'});
            }else{
                var count = 0;
                count = reports.length;
                res.json({success: true, countreports: count, listReports: reports});
            }
        }
    });
};

const getSingleReport = function(req, res){
    if (!req.params.id) {
        res.json({ success: false, message: 'No news ID was provided.' });
    } else {
        ReportModel.findOne({ _id: req.params.id }, (err, report) => {
            if (err) {
                res.json({ success: false, message: 'Not a valid report id' }); // Return error message
            } else {
                if (!report) {
                    res.json({ success: false, message: 'report not found.' });
                } else {
                    res.json({ success: true, game: report });
                }
            }
        });
    }
}

module.exports = {
    addReport,
    editReport,
    deleteReport,
    getAllReports,
    getSingleReport
}
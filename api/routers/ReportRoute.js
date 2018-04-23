const express = require('express');

const config = require('../config/db');
const router = express.Router();

const ReportController = require('../controllers/ReportController');

router.route('/addreport').post(ReportController.addReport);

router.route('/editreport').put(ReportController.editReport);

router.route('/deletereport/:id').delete(ReportController.deleteReport);

router.route('/getall').get(ReportController.getAllReports);

router.route('/getsingle/:id').get(ReportController.getSingleReport);

module.exports = router;
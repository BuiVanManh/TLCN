const express = require('express');

const config = require('../config/db');
const router = express.Router();

const EventController = require('../controllers/EventController');

router.route('/addevent').post(EventController.addEvent);

router.route('/editevent').put(EventController.editEvent);

router.route('/deleteevent/:id').delete(EventController.deleteEvent);

router.route('/getall').get(EventController.getAllEvents);

router.route('/gettop6').get(EventController.getTop6Events);

router.route('/getsingle/:id').get(EventController.getSingleEvent);

module.exports = router;
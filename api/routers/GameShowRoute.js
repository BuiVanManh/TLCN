const express = require('express');

const config = require('../config/db');
const router = express.Router();

const GameShowController = require('../controllers/GameShowController');

router.route('/addgameshow').post(GameShowController.addGameShow);
router.route('/editgameshow').put(GameShowController.editGameShow);
router.route('/getall').get(GameShowController.getAllGameShows);

module.exports = router;
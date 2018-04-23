const express = require('express');

const config = require('../config/db');
const router = express.Router();

const GameController = require('../controllers/GameController');

router.route('/addgame').post(GameController.addGame);

router.route('/editgame').put(GameController.editGame);

router.route('/deletegame/:id').delete(GameController.deleteGame);

router.route('/getall').get(GameController.getAllGames);

router.route('/getsingle/:id').get(GameController.getSingleGame);

module.exports = router;
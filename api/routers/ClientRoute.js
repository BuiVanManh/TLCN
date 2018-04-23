const express = require('express');

const config = require('../config/db');
const router = express.Router();

const ClientController = require('../controllers/ClientController');

router.route('/addclient').post(ClientController.addClient);
router.route('/getclients/:id').get(ClientController.getClientByEvent);
router.get('/checkEmail/:email', ClientController.checkEmail);
router.route('/getsingle/:id').get(ClientController.getSingleClient);

module.exports = router;
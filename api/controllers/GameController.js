const GameModel = require('../models/GameModel');

const config = require('../config/db');

var addGame = function (req, res) {
    if (!req.body.title) {
        res.json({ success: false, message: 'You need to add title game' });
    } else {
        if (!req.body.prizeamount) {
            res.json({ success: false, message: 'You need to add number of prizes' });
        } else {
            let gamemodel = new GameModel({
                
                title: req.body.title,
                prizeamount: req.body.prizeamount,
                employee: req.body.employee,
            });
            console.log(gamemodel);
            gamemodel.save(function (err) {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    res.json({ success: true, message: 'Success!' });
                }
            });
        }
    }
    
};

var editGame = function (req, res) {
    if (!req.body.id) {
        res.json({ success: false, message: 'No game ID was provided.' });
    } else {
        GameModel.findOne({ _id: req.body.id }, (err, game) => {
            if(err) {
                res.json({ success: false, message: 'Not a valid game id' });
            } else {
                if (!game) {
                    res.json({ success: false, message: 'game was not found.' });
                } else { 
                    game.title = req.body.title,
                    game.prizeamount = req.body.prizeamount,
                    game.save((err) => { 
                        if(err){
                            res.json({success: false, message: err});
                        } else {
                            res.json({ success: true, message: 'game had updated!' });
                        }
                    });
                }
            }
        });
    }
};


var deleteGame = function (req, res) {
    if (!req.params.id) {
        res.json({ success: false, message: 'No game id provided' });
    } else {
        GameModel.findOne({ _id: req.params.id }, (err, game) => {
            if (err) {
                res.json({ success: false, message: 'Invalid id' });
            } else {
                if (!game) {
                    res.json({ success: false, messasge: 'This game was not found!' });
                } else {
                    game.remove((err) => {
                        if (err) {
                            res.json({ success: false, message: 'Can not delete this game' });
                        } else {
                            res.json({ success: true, message: 'Game had been deleted!' });
                        }
                    });
                }
            }
        });
    }
};

const getAllGames = function(req, res){
    GameModel.find({}, function(err, games){
        if(err){
            res.json({success: false, message: 'Error: ' + err});
        }else{
            if(!games){
                res.json({success: false, message: 'Null'});
            }else{
                var count = 0;
                count = games.length;
                res.json({success: true, countgames: count, listGames: games});
            }
        }
    });
};

const getSingleGame = function(req, res){
    if (!req.params.id) {
        res.json({ success: false, message: 'No news ID was provided.' });
    } else {
        GameModel.findOne({ _id: req.params.id }, (err, game) => {
            if (err) {
                res.json({ success: false, message: 'Not a valid game id' }); // Return error message
            } else {
                if (!game) {
                    res.json({ success: false, message: 'game not found.' });
                } else {
                    res.json({ success: true, game: game });
                }
            }
        });
    }
}

module.exports = {
    addGame,
    editGame,
    deleteGame,
    getAllGames,
    getSingleGame
}
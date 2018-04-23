const GameShowModel = require('../models/GameShowModel');

const config = require('../config/db');

var addGameShow = function (req, res) {
    if (!req.body.title_first) {
        res.json({ success: false, message: 'You need to add title game' });
    } else {
        if (!req.body.prize_first) {
            res.json({ success: false, message: 'You need to add number of prizes' });
        } else {
            if (!req.body.image_first){
                res.json({ success: false, message: 'You need to add image background' });
            }
            else {
                let gamemodel = new GameShowModel({
                    title_first: req.body.title_first,
                    prize_first: req.body.prize_first,
                    image_first: req.body.image_first,

                    title_second: req.body.title_second,
                    prize_second: req.body.prize_second,
                    image_second: req.body.image_second,

                    title_third: req.body.title_third,
                    prize_third: req.body.prize_third,
                    image_third: req.body.image_third,

                    winner1: req.body.winner1,
                    winner2: req.body.winner2,
                    winner3: req.body.winner3,
                    game: req.body.game,
                    event: req.body.event,
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
    }
    
};

var editGameShow = function (req, res) {
    if (!req.body.id) {
        res.json({ success: false, message: 'No game ID was provided.' });
    } else {
        GameShowModel.findOne({ _id: req.body.id }, (err, game) => {
            if(err) {
                res.json({ success: false, message: 'Not a valid game id' });
            } else {
                if (!game) {
                    res.json({ success: false, message: 'game was not found.' });
                } else { 
                    game.winner1 = req.body.winner1,
                    game.winner2 = req.body.winner2,
                    game.winner3 = req.body.winner3,
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


var deleteGameShow = function (req, res) {
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

const getAllGameShows = function(req, res){
    GameShowModel.find({}).populate({path: 'event', model: 'EventModel', populate: {
            path: 'game',
            model: 'GameModel'           
        }
    }).exec(function(err, gameshows){
        if(err){
            res.json({success: false, message: 'Error: ' + err});
        }else{
            if(!gameshows){
                res.json({success: false, message: 'Null'});
            }else{
                var count = 0;
                count = gameshows.length;
                res.json({success: true, countgameshows: count, listGameShows: gameshows});
            }
        }
    });
};

const getSingleGameShow = function(req, res){
    if (!req.params.id) {
        res.json({ success: false, message: 'No news ID was provided.' });
    } else {
        GameShowModel.findOne({ _id: req.params.id }, (err, gameshow) => {
            if (err) {
                res.json({ success: false, message: 'Not a valid game id' }); // Return error message
            } else {
                if (!gameshow) {
                    res.json({ success: false, message: 'game not found.' });
                } else {
                    res.json({ success: true, gameshow: gameshow });
                }
            }
        });
    }
}

module.exports = {
    addGameShow,
    editGameShow,
    deleteGameShow,
    getAllGameShows,
    getSingleGameShow
}
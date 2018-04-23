const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameShowModelSchema = new Schema({

    title_first: {type: String, required: true},
    prize_first: {type: String, required: true},
    image_first: {type: String, required: true},

    title_second: {type: String, required: true},
    prize_second: {type: String, required: true},
    image_second: {type: String, required: true},

    title_third: {type: String, required: true},
    prize_third: {type: String, required: true},
    image_third: {type: String, required: true},

    winner1: {type: Schema.ObjectId, ref: 'ClientModel' },
    winner2: {type: Schema.ObjectId, ref: 'ClientModel' },
    winner3: {type: Schema.ObjectId, ref: 'ClientModel' },
    
    game: {type: Schema.ObjectId, ref: 'GameModel'},
    event: {type: Schema.ObjectId, ref: 'EventModel'},
});

const GameShowModel = mongoose.model('GameShowModel', gameShowModelSchema);

module.exports = GameShowModel;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameModelSchema = new Schema({
  title: {type: String, required: true},
  prizeamount: {type: String, required: true},
  employee: {type: Schema.ObjectId, ref: 'UserModel'}
});

const GameModel = mongoose.model('GameModel', gameModelSchema);

module.exports = GameModel;
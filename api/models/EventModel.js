const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const eventModelSchema = new Schema({
    title: {type: String, required: true},
    image: {type: String, required: true},
    number: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true},
    create_date: {type: Date, default: Date.now},
    start_date: {type: String, require: true},
    end_date: {type: String, require: true},
    employee: {type: Schema.ObjectId, ref: 'UserModel'},
    game: {type: Schema.ObjectId, ref: 'GameModel'},
});

const EventModel = mongoose.model('EventModel', eventModelSchema);

module.exports = EventModel;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportModelSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    content: {type: String, required: true},
    event: {type: Schema.ObjectId, ref: 'EventModel'}
});

const ReportModel = mongoose.model('ReportModel', reportModelSchema);

module.exports = ReportModel;
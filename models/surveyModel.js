const { Schema, model } = require('mongoose');
const recipientSchema = require('./recipientSchema');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [recipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  dateSent: Date,
  lastResponed: Date,
});

const Survey = model('Survey', surveySchema);

module.exports = Survey;

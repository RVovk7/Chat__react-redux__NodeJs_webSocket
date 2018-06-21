const mongoose = require('mongoose');
const { regSchema } = require('./schema');
const Question = mongoose.model('Question', regSchema);

module.exports = {Question};
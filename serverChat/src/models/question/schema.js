const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const regSchema = new mongoose.Schema({
    login: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minlength: 3
    },
    email: String,
    pass: String
  });
  module.exports = {regSchema};
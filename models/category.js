const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  category: {
    type: String,
    require: true
  },
  icon: {
    type: String,
    require: true
  }
})
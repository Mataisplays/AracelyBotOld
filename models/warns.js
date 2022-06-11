const mongoose = require('mongoose')
const Schema = mongoose.Schema


const warns = new Schema({
    GuildID:  String,
    UserID: String,
    Content:  Array,
}) 

module.exports = mongoose.model('WarnDB', warns)
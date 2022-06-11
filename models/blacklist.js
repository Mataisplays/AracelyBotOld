const mongoose = require('mongoose')
const Schema = mongoose.Schema


const blacklist = new Schema({
    reason: {type: "string"},
    id: {type: "string"}
}) 

module.exports = mongoose.model('blacklist', blacklist)
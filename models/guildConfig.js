const mongoose = require('mongoose')
const Schema = mongoose.Schema


const guild = new Schema({
    idguild: {type: 'string'},
    confession: {type: "string"},
    suggestchannel: {type: 'string'},
})

module.exports = mongoose.model('GuildConfig', guild)
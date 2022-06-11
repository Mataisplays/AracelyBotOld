const Discord = require("discord.js")
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 

module.exports = (client, oldMessage, newMessage) => {
  
client.emit("messageCreate", newMessage)

}
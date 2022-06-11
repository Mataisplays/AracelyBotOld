const Discord = require("discord.js")
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 

module.exports = (client, message) => {

  if(message.id === "913624444709257267"){
    message.channel.send(message)
  }
    
    if (message.content.includes("confess" || "confesar")) return;
    if(message.embeds[0] && message.content === '') return;
    console.log(`author: ${message.author.tag} (${message.author.id}), message: ${message.content}`)
        client.snipes.set(message.channel.id, {
          content: message.content,
          delete: message.author,
          canal: message.channel,
          imagen : message.attachments.first() ? message.attachments.first().url : null
        });


}
const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 

module.exports = {
  name: "reroll", 
  alias: ["resortear"],
  description: "Elige a diferentes ganadores de los originales",
  usage: "{ID}",
  perms: ["MANAGE_GUILD"],
  clientperms: [],
  
execute (client, message, args){

    let id = args[0]
    if(!id) return message.channel.send("No has mencionado una id")
    if(client.giveaways.giveaways.filter(x => x.messageId === id).length !== 1) return message.channel.send("No hay un sorteo con ese id")
    client.giveaways.reroll(id).then(() => {
      
    })
 }

} 

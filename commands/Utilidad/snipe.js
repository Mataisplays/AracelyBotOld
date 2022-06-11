const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 

module.exports = {
  name: "snipe", 
  alias: [],
  description: "Busca el mensaje eliminado mas reciente.",
  usage: "[canal]",
  perms: [],
  clientperms: [],

execute (client, message, args){


  const channels = message.mentions.channels.first() || message.channel;
  
  const msg = client.snipes.get(channels.id);

  if (!msg) {
    message.channel.send("no han borrado un mensaje recientemente");
  } else {
    const embeda = new Discord.MessageEmbed()

      .setTitle("**Mensaje Snipeado**")
      .setAuthor(
        `Mensaje escrito por ${msg.delete.tag}`,
        msg.delete.displayAvatarURL()
      )
      .addField(`Canal`, `<#${msg.canal.id}>`)
      .setDescription(`${msg.content}`)
      .setColor("RANDOM");

      if(msg.imagen){
        embeda.setImage(`${msg.imagen}`)
      } //

    message.channel.send({ embeds: [embeda] });
  }


 }

} 

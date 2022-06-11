const Discord = require('discord.js');

module.exports = {
  name: "ping", 
  alias: ["tps"],
  description: "Muestra el ping del bot.",
  usage: "",
  perms: [],
  clientperms: [],


execute (client, message, args){

 let embed = new Discord.MessageEmbed()
 .setTitle("Ping")
 .setDescription(`> Latencia del API: ${client.ws.ping}\n> Delay de los mensajes: ${Date.now() - message.createdTimestamp}`)
 .setColor("RANDOM")
message.channel.send({ embeds: [embed] });


 }

} 

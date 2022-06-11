const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 

module.exports = {
  name: "avatar", 
  alias: ["icon"],
  description: "muestra el avatar de su hijo",
  usage: "[ Usuario ]",
  perms: [],
  clientperms: [],

execute (client, message, args){

let user = message.mentions.users.first() || message.author

  let embed = new MessageEmbed()
  .setTitle(`Avatar de ${user.nickname ? user.nickname : user.tag}`)
  .setDescription(`[[PNG]](${user.displayAvatarURL({ format: "png" }) }) [[JPG]](${user.displayAvatarURL({ format: "jpg" }) }) [[GIF]](${user.displayAvatarURL({ format: "gif" }) }) [[WEBP]](${user.displayAvatarURL() })`)
  .setImage(user.displayAvatarURL({dynamic: true, size: 1024 }))
  .setColor("RANDOM")
  message.channel.send({ embeds: [embed]})
 }

} 

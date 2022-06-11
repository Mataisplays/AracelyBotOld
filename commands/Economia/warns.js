const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js');
const db = require("megadb")
const warns = new db.crearDB("warns")
module.exports = {
  name: "warns", 
  alias: ["advertencias"],
  description: "Muestra las advertencias de un usuario.",
  usage: "[ usuario ]",
  perms: ["MANAGE_MESSAGES"],
  clientperms: [],


async execute (client, message, args){

  return message.channel.send('Por favor use el sistema de warns de slashcommands')
  
const user = message.mentions.users.first() || message.author

if(!warns.has(`${message.guild.id}.${user.id}`)){
  const embed = new MessageEmbed()

  .setTitle("Warns del usuario")
  .setDescription(`El usuario ${user} no tiene warns`)
  .setColor("GREEN")

  message.channel.send({embeds: [embed]})


}



warns.map(`${message.guild.id}.${user.id}`, (v, key) => `Razon : ${key}\nWarneado por: ${v}`).then(datos => {
  const xd = new MessageEmbed()

  .setAuthor(`Warns de ${user.username}`, user.avatarURL)
  .setDescription(datos.join('\n\n'))
  .setColor("GREEN")

  message.channel.send({embeds: [xd]})

})


   }

 }


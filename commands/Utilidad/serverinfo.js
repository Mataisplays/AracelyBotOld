const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 
const moment = require('moment');

module.exports = {
  name: "serverinfo", 
  alias: ["infoserver"],
  description: "Muestra la informacion del servidor.",
  usage: "",
  perms: [],
  clientperms: [],
  
async execute (client, message, args){

var owner = await message.guild.fetchOwner()
const verificationLvl = {

  "NONE": "\⚫ Ninguno",
  "LOW": "\🟢 Bajo",
  "MEDIUM": "\🟡 Medio",
  "HIGH": "\🟠 Alto",
  "VERY_HIGH": "\🔴 Muy alto"
  
}

const embed = new MessageEmbed()
.setTitle("Datos del servidor: " + message.guild.name)
.addField("Nombre", `\`${message.guild.name}\``, true)
.addField("ID", `\`${message.guild.id}\``, true)
.addField("Fecha de crecion", `<t:${Math.round(message.guild.createdAt/1000)}:F> (<t:${Math.round(message.guild.createdAt/1000)}:R>)`, true)
.addField("Dueño", `**${owner.user.tag}**`, true)
.addField("Miembros", `**${message.guild.memberCount}**`, true)
.addField("Usuarios", `\`${message.guild.members.cache.filter(x => !x.user.bot).size}\``, true)
.addField("Bots", `\`${message.guild.members.cache.filter(b => b.user.bot).size}\``, true)
.addField("Emojis", `\`${message.guild.emojis.cache.size}\``, true)
.addField("Boosts", `\`${message.guild.premiumSubscriptionCount.toString()}\``, true)
.addField("Nivel de verificacion", `\`${verificationLvl[message.guild.verificationLevel]}\``, true)
.addField("Roles", `\`${message.guild.roles.cache.size}\``, true)
.addField("Canales", `\`${message.guild.channels.cache.filter(x => !x.isThread).size}\``, true)
.addField("Canales de texto", `\`${message.guild.channels.cache.filter(x => x.isText() && x.type !== "GUILD_PUBLIC_THREAD" && x.type !== "GUILD_PRIVATE_THREAD").size}\``, true)
.addField("Canales de voz", `\`${message.guild.channels.cache.filter(x => x.isVoice()).size}\``, true)
.addField("Hilos", `\`${message.guild.channels.cache.filter(x => x.isThread()).size}\``, true)
.setThumbnail(message.guild.iconURL())
.setColor("ORANGE")

message.channel.send({embeds: [embed]})

 }

} 

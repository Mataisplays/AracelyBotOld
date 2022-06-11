const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 
const moment = require('moment')
module.exports = {
  name: "userinfo", 
  alias: ["infouser"],
  description: "Muestra la informacion del usuario.",
  usage: "[mencion]",
  perms: [],
  clientperms: [],

execute (client, message, args){


    
let presenceStatus = {
  "online": "🟢En linea",
  "idle": "🟡Ausente",
  "dnd": "🔴No molestar",
  "offline": "⚫Desconectado / invisible"
}

let member = message.mentions.members.first() || message.member;

 



function formatDate (template, date){
var time = 'YYYY:MM:DD:mm:ss'.split(':')
date = new Date(date || Date.now - new Date().getTimezoneOffset() *6e4 )
return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {

  return template.split(tiempo[i]).join(item)


}, template)

}


const embed = new MessageEmbed()
.setTitle("**INFO. DEL USUARIO**")
.setDescription(`Esta es la informacion de ${member}`)
.addField("Nombre", `\`${member.user.tag}\``, true)
.addField('ID', `\`${member.user.id}\``, true)
.addField('Discriminador', `\`#${member.user.discriminator}\``, true)
.addField('Apodo del usuario', `\`${member.nickname !== null ? `${member.nickname}`: 'ninguno'}\``)
.addField(`Roles (${member.roles.cache.size})`, `\`${member.roles.cache.map(x => x.name).slice(0, 10).join(`,`)}\``, true)
.addField("¿Bot?", `\`${member.user.bot? "si" : "no"}\``, true)
.addField('Bosteo', `\`${member.premiumSince ? `Usuario booster`: `No ha bosteado aun`}\``, true)
.addField("Se unio al servidor", `<t:${Math.round(member.joinedAt/1000)}:f> (<t:${Math.round(member.joinedAt/1000)}:R>)`,true)
.addField("Se unio a discord", `<t:${Math.round(member.user.createdAt/1000)}:f> (<t:${Math.round(member.user.createdAt/1000)}:R>)`, true)
.setThumbnail(member.user.displayAvatarURL({ format : "png"}))
.setColor("RANDOM")

message.channel.send({embeds: [embed]})

 }

} 

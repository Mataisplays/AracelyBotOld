const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js');
const db = require("megadb")
const warns = new db.crearDB("warns")

module.exports = {
  name: "warn", 
  alias: ["advertir"],
  description: "advierte a un usuario.",
  usage: "{ usuario } [ razon ]",
  perms: ["MANAGE_MESSAGES"],
  clientperms: [],

async execute (client, message, args){
    
return message.channel.send('Por favor use el sistema de warns de slashcommands')

const usere = message.mentions.members.first()
if(!usere) return message.channel.send("No has mencionado un usuario")

if(usere.id === message.author.id) return message.channel.send("No te puedes warnear a ti mismo")

if(usere.id === client.user.id) return message.channel.send("No me puedo warnear a mi misma")

let comprobacion = message.member.roles.highest.comparePositionTo(usere.roles.highest)

if(comprobacion < 1) return message.channel.send("El usuario tiene roles iguales o mayores")

if(usere.id == client.user.id) return message.channel.send("No me puedo warnear a mi mismo")
if(usere.id == message.author.id) return message.channel.send("No te puedes warnear a ti mismo")
if(usere.user.bot) return message.channel.send("No puedes warnear un bot")
if(message.guild.me.roles.highest.comparePositionTo(usere.roles.highest) < 0) return message.channel.send("El usuario tiene roles mas altos que el mio")
if(!usere) return message.channel.send("Tienes que mencionar a alguien")

let razon = args.slice(1).join(" ") || "sin razon"

warns.establecer(`${message.guild.id}.${usere.id}.${razon}`, `<@${message.author.id}>`).catch(error => message.channel.send("hubo un error, talves puso caracteres incorrectos"))

const embed = new MessageEmbed()

.setTitle("Usuario Warneado")
.setDescription(`el usuario ${usere} ha sido warneado por ${message.author}`)
.addField(`Razon `, `${razon}`)
.setColor("ORANGE")

message.channel.send({embeds: [embed]})

 }

} 
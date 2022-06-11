const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 
const zeeco = require('zeew-eco')
const eco = require('../../models/economy')

module.exports = {
  name: "addmoney", 
  alias: ["add-money"],
  description: "Agregale dinero al usuario mencionado.",
  usage: "{ usuario } { cantidad }",
  perms: [],
  clientperms: [""],

async execute (client, message, args){

if(message.author.id !== "726159353970819102") return message.channel.send("Solo mi dueño puede usar ese comando")

const a = message.mentions.users.first()
if(!a) return message.channel.send("No has mencionado a alguien")
if(isNaN(args[1])) return message.channel.send("Ese no es un numero!")
if(!args[1]) return message.channel.send("No has mencionado un numero")


let db = await eco.findOne({ user: a.id })

if(!db){
  const XD = new eco({
    user: a.id,
    money: 0
  })

  return message.channel.send("Vuelve a usar el comando")
}

eco.findOneAndUpdate({ user: a.id, money: db.money + args[1]})
    const embed = new MessageEmbed()
    .setTitle("Exito")
    .setDescription("Se le ha dado a <@" +a+ `>  ${args[1]} donas 🍩`)
    .setTimestamp()
    .setColor("GREEN")
    message.channel.send({embeds: [embed]})
 }

} 
const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 

module.exports = {
  name: "8ball", 
  alias: ["bola8", "8b"],
  description: "Has una pregunta (cerrada) y el bot te contestara",
  usage: "{ pregunta }",
  perms: [],
  clientperms: [""],

async execute (client, message, args){

let question = args.join(" ")
if(!question) return message.channel.send("No has puesto una pregunta")

if(question.length > 40) return message.channel.send("Tu pregunta es muy larga")
    let replies = ["si", "no", "talvez", "no lo se", "puedes repetir la pregunta?", "no lo creo", "creo que si"];

    let embed = new MessageEmbed()
    .setTitle("8 ball")
    .setDescription(`Pregunta: ${question}\nRespuesta: ${replies[Math.floor(Math.random() * replies.length)]}`)
    .setColor("RANDOM")

    message.reply({ embeds: [embed] })
}

} 

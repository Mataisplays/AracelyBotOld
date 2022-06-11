const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 
const { inspect } = require("util")

module.exports = {
  name: "eval",
  alias: ["evaluar", "e"],
  perms: [],
  clientperms: [],

async execute (client, message, args){

let privilegiados = ["670722679883431937", "726159353970819102", "807703053003259916",]  

if(!privilegiados.includes(message.author.id)) return message.channel.send("No puedes usar este comando!")

const command = args.join(" ")
if(!command) return message.channel.send("No has puesto tu codigo")


function enviar(msg){
  if(!msg) throw new Error("No has puesto un mensaje")
  message.channel.send(msg)
}

try{

  const evaled = eval(command)
  const embed = new MessageEmbed()
  .setTitle("Codigo evaluado correctamente!")
  .addField("Tipo", `\`\`\`prolog\n${typeof(evaled)}\`\`\``, true)
  .addField("Evaluado en", `\`\`\`yaml\n${Date.now() - message.createdTimestamp}ms\`\`\` `, true)
  .addField("Entrada", `\`\`\`javascript\n${command}\`\`\``)
  .addField("Salida", `\`\`\`javascript\n${inspect(evaled, {depth: 0})}\`\`\` `)
  .setColor("GREEN")
  message.channel.send({embeds: [embed]})

//
  
} catch(error) {
  const embedf = new MessageEmbed()
  .setTitle("Hubo un error")
 .addField("Entrada", `\`\`\`javascript\n${command}\`\`\``)
 .addField("Error", `\`\`\`javascript\n${error}\`\`\` `)
 .setColor("RED")
message.channel.send({embeds: [embedf]})

}

 }

} 
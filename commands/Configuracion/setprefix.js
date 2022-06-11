const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 
const prefix_db = require('../../models/prefix')
module.exports = {
  name: "setprefix", 
  alias: [],
  description: "Establece un prefix personalizado.",
  usage: "{ prefix }",
  perms : ["MANAGE_GUILD"],
  clientperms: [""],

async execute (client, message, args){

let prefix = args.join(" ")
if(!prefix) return message.channel.send("No has dicho un prefix")
const Regex = /\p{Emoji}/gu.test(message.content)

if(Regex)  return message.channel.send("No puedes usar emojis o numeros")


if(prefix.length > 4) return message.channel.send("Ese es un prefix muy largo")



let serverFind = await prefix_db.findOne({ idguild: message.guild.id})

let savePrefix  = new prefix_db({
  idguild: `${message.guild.id}`,
  prefix
})

//

serverFind ? await prefix_db.updateOne({idguild: message.guild.id}, { prefix: prefix}) : await savePrefix.save().catch(e => console.log(e))

let embed = new MessageEmbed()
.setTitle("Exito")
.setDescription("Se ha colocado el prefix **" + prefix + "** correctamente!")
.setColor("GREEN")

message.channel.send({embeds: [embed]})


//

 }

} 

const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 
const guildConfig = require('../../models/guildConfig')
const ms = require('ms')

module.exports = {
  name: "confess", 
  alias: ["confesar"],
  description: "confiesate",
  usage: "{ confesion }",
  perms: [],
  clientperms: [""],

async execute (client, message, args){


  let db = await guildConfig.findOne({ idguild: message.guild.id });
console.log(db)
  if(db){
}else{
  message.delete()
  message.channel.send("Este servidor no tiene el canal de confesiones establecido").then(m => { setTimeout(() => {
    m.delete()
  }, 4000)
})
  
return;
}

const confess = args.join(" ")

if(!confess) return message.channel.send("No has puesto una confesion")


const embed = new MessageEmbed()
.setTitle("Confesion")
.setDescription(confess)
.setColor("RANDOM")
.setFooter("Mensaje escrito por Anonimo")
.setTimestamp()

if(message.content.endsWith("--na")){
     let confessNotAnonim = confess.substring(0, confess.length - 4)
  embed.setDescription(confessNotAnonim)
  embed.setFooter("Mensaje escrito por " + message.author.tag, message.author.displayAvatarURL())
}


client.channels.cache.get(db.confession).send({embeds: [embed]})
message.delete()
message.channel.send("Se ha mandado la confesion con exito").then(m => {
  setTimeout(() => {
  m.delete({ timeout: 3000})

}, ms("5s"))
})


 }

} 

const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 

module.exports = {
  name: "reportbug", 
  alias: ["bugreport"],
  description: "Reporta cualquier bug",
  usage: "{ bug }",
  perms: [],
  clientperms: [],

execute (client, message, args){

if(!args.join(" ")) return message.channel.send("No has mencionado el bug")
    
const embed = new MessageEmbed()
.setTitle("Report bug")
.setDescription(args.join(" "))
.setColor("ORANGE")
.setAuthor(message.author.tag, message.author.displayAvatarURL())
.setFooter(`Desde ${message.guild.name}`, message.guild.iconURL())


let owner = client.users.cache.get("726159353970819102")
owner.send({embeds: [embed]})
    
    message.channel.send(`Gracias por tu reporte! ahora ${owner.tag} va arreglar el bug!`)
    
 }

} 

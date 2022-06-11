const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 
const { MessageAttachment } = require("discord.js");
const Zeew = require("zeew")



module.exports = {
  name: "triggered", 
  alias: [],
  description: "Haz una imagen de triggered",
  usage: "[ usuario ]",
  perms: [],
  clientperms: [],
  
async execute (client, message, args){

    




    let user = message.mentions.users.first()|| await client.users.fetch(args[0])  || message.author
    const img = new Zeew.img(process.env.zeew);
    let enviar = await img.filter.triggered(user.displayAvatarURL({ format: "jpg"}))
    let att = new MessageAttachment(enviar, "triggered.gif")





    message.channel.send({ files: [att],embeds: [new MessageEmbed().setTitle(`${user.tag} esta enojao >:(`).setImage("attachment://triggered.gif").setColor("ORANGE")]})

   

 }

} 

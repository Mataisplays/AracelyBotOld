const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 
const Zeew = require('zeew')


module.exports = {
  name: "reversecolor", 
  alias: ["invertircolor"],
  description: "invierte los colores del perfil de un usuario",
  usage: "[ usuario ]",
  perms: [],
  clientperms: [""],
  
async execute (client, message, args){


    let user = message.mentions.users.first() || await client.users.fetch(args[0]) || message.author 
    let img = new Zeew.img(process.env.zeew)
    console.log(user)
    let a = await img.filter.invertir(user.displayAvatarURL({ format: 'png'}))

    let asd = new Discord.MessageAttachment(a, "xd.jpg")
    let msg = await message.channel.send(`Estoy haciendo la imagen, espera un momento`)
    msg.edit({ files: [asd], content: "imagen hecha correctamente" })


 }
//
} 

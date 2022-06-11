const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 
const fetch = require('node-superfetch')

module.exports = {
  name: "nasa", 
  alias: ["nasa-apod"],
  description: "obten la imagen del dia de la api de la nasa",
  usage: "",
  perms: [],
  clientperms: [],
  
async execute (client, message, args){

  const { body } = await fetch.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.nasa}`)

  let embed = new MessageEmbed()
  .setTitle(`${body.title}`)
  .setDescription(body.explanation + `[[Descargar imagen]](${body.hdurl})`)
  .setImage(body.hdurl)
  .setColor("RANDOM")
  
  message.channel.send({ embeds: [embed]})
    

 }

} 

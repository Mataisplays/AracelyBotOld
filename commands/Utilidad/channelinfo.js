const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 

module.exports = {
  name: "channelinfo", 
  alias: ["cinfo"],
  description: "Muestra la informacion de este canal o de uno mencionado",
  usage: "[ canal ]",
  perms: [],
  clientperms: [],
  
execute (client, message, args){
let ch = message.mentions.channels.filter(x => x.guild.id === message.guild.id).first() || message.guild.channels.cache.get(args[0]) || message.channel

let type = {
    "GUILD_TEXT": "De texto",
    "GUILD_VOICE": "De voz",
    "GUILD_CATEGORY ": "Categoria",
    "GUILD_NEWS": "De noticias",
    "GUILD_STORE": "Tienda",
    "GUILD_NEWS_THREAD ": "Hilo en un canal de noticias",
    "GUILD_PUBLIC_THREAD ": "Hilo publico",
    "GUILD_PRIVATE_THREAD ": "Hilo privado",
    "GUILD_STAGE_VOICE": "Escenario",
    "UNKNOWN": "Desconocido"

}
    const embed = new MessageEmbed()
    .setTitle(`Informacion de: #${ch.name}`)
    .addField(`Nombre`, `\`${ch.name}\`` )
    .addField(`Tipo`, `\` ${type[ch.type]}\`` )
    .addField(`Categoria`, `\`${ch.parentId ? message.guild.channels.cache.get(ch.parentId).name : "No tiene"}\`` )
    .addField(`Tema`, `\`${ch.topic ? ch.topic : "No tiene"}\`` )
    .addField(`¿NSFW?`, `\`${ch.nsfw ? "Si" : "No"}\`` )
    .addField("Posicion", `\`${ch.position}\`` )
    .addField("Creado en:", `<t:${Math.round(ch.createdAt/1000)}:F> (<t:${Math.round(ch.createdAt/1000)}:R>)` )
    const array = []



    if(ch.type === "GUILD_VOICE"){

         array.push({
            name : "Limite de usuarios",
            value: `\`${ch.userLimit}\`` 
         })
         array.push({
            name : "Tasa de bits",
            value: `\`${ch.bitrate}\`` 
         })

    }

    if(array.length > 0) embed.addFields(array)

    message.channel.send({ embeds: [embed]})

 }

} 

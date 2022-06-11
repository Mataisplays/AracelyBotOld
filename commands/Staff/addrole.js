const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 

module.exports = {
  name: "addrole", 
  alias: [],
  description: "Añade un rol a un usuario.",
  usage: "[mencion]",
  perms: ["MANAGE_ROLES"],
  clientperms: ["MANAGE_ROLES"],

execute (client, message, args){



  let miembro = message.mentions.members.first();

  let rol = message.mentions.roles.first();

  if(!miembro) return message.channel.send(`No puedes darle un rol a una mencion inexistente`);

  if(!rol) return message.channel.send(`No puedes dar un rol inexistente`)
  if(rol.managed) return message.channel.send('El rol es de una integracion')
  if(rol.position > message.member.roles.highest.position) return message.channel.send('Ese rol es mas alto que el mas alto que tienes tu')
  if(message.guild.me.roles.highest.position <= rol.position) return message.channel.send('No puedo ponerte ese rol')



  let rolArray = message.member.roles.cache.map(x => x.id)

  if(rolArray.includes(rol.id)) return message.channel.send("Ya tienes ese rol")
  
  
try{

  miembro.roles.add(rol.id)
}catch(e){
  console.log(e)
  message.channel.send("Ha ocurrido un error")
  return;
}
  const embed = new MessageEmbed()
  .setTitle("Rol dado exitosamente")
  .setDescription(`Se le ha dado el rol ${rol} a ${miembro}`)
  .setColor("GREEN")
  .setTimestamp()

  message.channel.send({embeds : [embed]});

 }

} 

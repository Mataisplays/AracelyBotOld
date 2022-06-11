const Discord = require('discord.js');  
const {Client , MessageEmbed} = require('discord.js')
module.exports = {
  name: "ban", 
  alias: ["banear"], 
  description: "Banea al usuario mencionado con/sin razon.",
  usage: "{ usuario } [razon]",
  perms: ["BAN_MEMBERS"],
  clientperms: ["BAN_MEMBERS"],

execute (client, message, args){





  let user = message.mentions.members.first();
    if(!user) return message.channel.send("No has mencionado a alguien")
    if(user.id == client.user.id) return message.channel.send("No me puedo banear a mi mismo")
    if(user.id == message.author.id) return message.channel.send("No te puedes banear a ti mismo")
  let banReason = args.slice(2).join(" ") || "sin razon"

  if(!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.send("no tienes permisos ")

  if(!user) return message.channel.send("menciona a alguien")

  if(message.member.roles.highest.position <= user.roles.highest.position) return message.channel.send('El usuario tiene un rol mas alto que el tuyo')

  if(user.id === message.author.id) return message.channel.send(`No te puedo banear a ti mismo`)
  if (user.id === client.user.id) return message.channel.send(`No me puedo banear a mi mismo`)


  if(!user.bannable) return message.channel.send("No puedo banear a ese usuario")
  user.ban({reason: `${message.author.id} baneo: ${banReason}`})
  const embed = new MessageEmbed()
  .setTitle("Usuario baneado")
  .setDescription(`**${user.user.tag} fue baneado por ${message.author}**`)
  .addField("Razon", banReason)
  .setColor("GREEN")
  message.channel.send({embeds: [embed]})

 }

} 
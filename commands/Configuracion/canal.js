const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 
const guildConfig = require('../../models/guildConfig')
module.exports = {
  name: "canal", 
  alias: ["channel"],
  description: "Establece un canal para una funcion.",
  usage: "{ canal } { tipo }",
  perms: ["MANAGE_CHANNELS"],
  clientperms: [""],
  
async execute (client, message, args){




let channel = message.mentions.channels.first()
if(!channel) return message.channel.send("No has mencionado un canal")
 if(!channel.isText()) return message.channel.send("El canal mencionado no es de texto")

 if(!channel.permissionsFor(message.guild.me).has(["VIEW_CHANNEL", "SEND_MESSAGES"])) return message.channel.send("No tengo permisos para ver ese canal")



let channelGuild = message.guild.channels.resolve(channel.id)
if(!channelGuild) return message.channel.send("Ese canal no es de este servidor")

let type = args[1]
if(!type) return message.channel.send("No has mencionado un tipo `confesiones/tickets/sugerencias`")

let typeArray = ["confesiones", "tickets", "sugerencias"]

if(!typeArray.includes(type)) return message.channel.send("Eso no es un tipo!")

if(type.toLowerCase() === "confesiones"){

  const db = await guildConfig.findOne({idguild: message.guild.id})

  let confess = new guildConfig({
    idguild: message.guild.id,
    confession: channel.id
  })
  db ? await guildConfig.updateOne({idguild: message.guild.id}, {confession: channel.id}) : await confess.save()
  message.channel.send(`El canal ${channel} ha sido seleccionado para las confesiones`)
  return;
}

if(type.toLowerCase() === "tickets"){

  const rows = new Discord.MessageActionRow()
  .addComponents(
    new Discord.MessageButton()
    .setLabel("Crear Ticket")
    .setStyle("PRIMARY")
    .setCustomId("ticketcreate")
  )
  const embed = new MessageEmbed()
  .setTitle("TICKETS")
  .setDescription("Crea un ticket con el boton de abajo\n\n\nEvita tickets innecesarios")
  .setColor("#2f3136")

  channel.send({ embeds: [embed], components: [rows]})
  message.channel.send(`El canal ${channel} ha sido seleccionado para los tickets`)

}

if(type.toLowerCase() === "sugerencias"){
  console.log("a")
  await guildConfig.findOne({ idguild: message.guild.id }, async(err, db) => {
    if(err) throw err
   if(!db) db = new guildConfig({
      idguild: message.guild.id,
      sugerencias: channel.id
    })
  
    db.save()
    message.channel.send(`El canal ${channel} ha sido seleccionado para las sugerencias`)
  })

}





 }

} 
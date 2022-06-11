const Discord = require('discord.js');

module.exports = {
  name: "send", 
  alias: ["saychannel"],
  description: "Manda un texto a un canal especifico.",
  usage: "{ canal} { texto }",
  perms: ["MANAGE_MESSAGES"],
  clientperms: [],

execute (client, message, args){

  
  let canal = message.mentions.channels.first()
   if(!canal) return message.channel.send("debes mencionar un canal")
  let texto = args.slice(1).join(" ")
   if(!texto) return message.channel.send("no puedo mandar un mensaje paraguayo") 
   if(!canal.isText()) return message.channel.send("El canal no es de texto")
message.delete().then(asd => {
  message.channel.send(`Has mandado correctamente el mensaje : ${texto}`)
})
canal.send(texto, {
  allowedMentions: { parse: [] }
})

 }

} 

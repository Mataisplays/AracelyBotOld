const Discord = require('discord.js');

module.exports = {
  name: "say", 
  alias: [],
  description: "Has que el bot diga algo!",
  usage: "{ texto }",
  perms: [],
  clientperms: [],

execute (client, message, args){



  let texto = args.join(" ")
   if(!texto) return message.channel.send("no puedo mandar un mensaje paraguayo") 


message.delete()
message.channel.send({
  content: texto+ `\n\n**- ${message.member.nickname ? message.member.nickname : message.author.tag}**`, allowedMentions: { parse: [] }
})
console.log(message.author.name + `(${message.author.id}) Say: ${texto}`)
 }

} 

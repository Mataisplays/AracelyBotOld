const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 
const { DiscordTogether } = require('discord-together')
const ms = require("ms")

module.exports = {
  name: "discord-together", 
  alias: ["youtube", "apesca"],
  description: "Usa las caracteristicas de discord-together.",
  usage: "",
  perms: [],
  clientperms: [""],

async execute (client, message, args){




client.discordTogether = new DiscordTogether(client)

if(message.member.voice.channel){

const embed = new MessageEmbed()
.setTitle('Discord Together')
.setDescription('Selecciona una actividad que quieras hacer')
.setColor("RANDOM")
.setThumbnail("https://cdn.discordapp.com/attachments/867834808969592883/868225172468015174/9k.png")



message.channel.send({ embeds:[embed] }).then(msg => {

/**
 * 
 * reaction{ty}
 * 
 */
    msg.react("869764569386594326")
    msg.react("869764240221827112")
  const filter = (reaction, user) => {

        
    if(user.bot) return
    if(reaction.emoji.id === "869764240221827112"){
        reaction.users.remove(user.id)
        if(!message.member.voice.channel)return;
     client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'fishing').then(invite => {
         const embed1 = new MessageEmbed()
  .setTitle("Fish-together")
  .setDescription("Da click abajo para entrar a fish-together")
  .addField("Enlace:",  `[Click aqui para ir](${invite.code})`)
  .setColor("BLUE")
         
message.channel.send("Te he enviado el codigo para entrar")
message.author.send({embeds: [embed1]}).catch(e => {  message.channel.send("No te puedo enviar un DM, asegurate de tenerlos abiertos")
                                                  })
})

        
     }

    
       if(reaction.emoji.id === "869764569386594326"){
if(user.bot) return;
reaction.users.remove(user.id)
if(!message.member.voice.channel)return;
client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(invite => {
message.channel.send("Te he enviado el codigo para entrar")
  const embed = new MessageEmbed()
  .setTitle("Youtube-together")
  .setDescription("Da click abajo para entrar a yt-together")
  .addField("Enlace:",  `[Click aqui para ir](${invite.code})`)
  .setColor("RED")

message.author.send({embeds: [embed]}).catch(e => {
       message.channel.send("Asegurate de tener los DMs abiertos la proxima vez!")
       console.log("cannot send a dm to " + `${user.tag}, error => ${e}`)
})
})



}
    
  }

msg.awaitReactions({ filter, time: ms("1h") })


    
    
    
 
})




}else{
  message.channel.send('Debes estar un canal de voz para hacer eso')
}

 }

} 

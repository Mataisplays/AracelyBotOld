const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 
const ms = require('ms');

module.exports = {
  name: "create", 
  alias: ["crear"],
  description: "Crea un sorteo",
  usage: "{canal} {tiempo} {ganadores} {premio}",
  perms: ["MANAGE_GUILD"],
  clientperms: [],
  
execute (client, message, args){

   let channel = message.mentions.channels.first()
   if(!channel) return message.channel.send("No has mencionado un canal")
   let time = args[1] 
   if(!time) return message.channel.send("No has mencionado el tiempo del sorteo")
   if(isNaN(ms(time))) return message.channel.send("El tiempo mencionado no es valido")
   let winners = args[2]
   if(!winners) return message.channel.send("No has mencionado la cantidad de ganadores")
   if(winners > 10) return message.channel.send("No puedes poner mas de 10 ganadores")
   let prize = args.slice(3).join(" ")
   if(!prize) return message.channel.send("No has mencionado un premio")

   client.giveaways.start(message.channel, {
    duration: ms(time),
    winnerCount : parseInt(winners),
    prize,
    messages: {
      giveaway: '🎉🎉 **SORTEO** 🎉🎉',
      giveawayEnded: '🎉🎉 **SORTEO TERMINADO** 🎉🎉',
      drawing: 'Termina: {timestamp}',
      dropMessage: 'Se el primero en reaccionar con 🎉 !',
      inviteToParticipate: 'Reacciona con 🎉 para participar!',
      winMessage: 'Felicidades, {winners}! Han ganado  **{this.prize}**!\n{this.messageURL}',
      embedFooter: '{this.winnerCount} ganador(es)',
      noWinner: 'No huvo participaciones validas.',
      hostedBy: 'Hosteado por: {this.hostedBy}',
      winners: 'Ganador(es):',
      endedAt: 'Termina:',
  }
})

 }

} 

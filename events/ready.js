const fs = require("fs")
const Discord = require("discord.js")
module.exports = async (client) => {//Exportamos
  
  console.log(`Conectado a discord correctamente`);//Para saber si se prendio el bot


  setInterval(() => {//Hacemos un intervalo
  function presence() {//Una funcion
 
  const activities = [`${client.guilds.cache.size} servidores`, `${client.users.cache.filter(x => !x.bot).size} usuarios`]

  const types = ["WATCHING", "PLAYING", "LISTENING", "COMPETING"]

  const randomA = activities[Math.floor(Math.random() * activities.length)]

  const randomB = types[Math.floor(Math.random() * types.length)]
  
  client.user.setStatus('dnd');
   client.user.setActivity(randomA, { type: randomB});

  }
  presence();


  }, 10000)

  await client.channels.cache.get('844582185108897832').messages.fetch('913884465447723079')
  await client.channels.cache.get('847977829470830642').messages.fetch('922632032335568907')
  

}
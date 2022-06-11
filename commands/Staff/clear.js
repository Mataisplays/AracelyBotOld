const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
  name: "clear", 
  alias: ["purge"],
  description: "Borra una cantidad de mensajes especificos.",
  usage: "{ cantidad }",
  perms: ["MANAGE_MESSAGES"],
  clientperms: ["MANAGE_MESSAGES"],

execute (client, message, args){



const cantidad = args[0]
 if(!cantidad) return message.channel.send("No puedo borrar una cantidad paraguaya")
 if (isNaN(args[0])) return message.channel.send('No es un numero!')
 if(cantidad.includes(".")) return message.channel.send("Solo puedes poner numeros enteros!")


  if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.channel.send("No tengo los permisos para borrar mensajes")


  if(cantidad < 1) return message.channel.send("La cantidad que has dado es menor a 1")
try{
message.delete();
}catch(e){
  
}
try{
  message.channel.bulkDelete(cantidad, true).then((msgs)=> {
    message.channel.send(`**${msgs.size}** mensajes han sido borrados correctamente`).then(msg => {
      setTimeout(()=> {
        msg.delete();
      }, ms("5s"))
    })
  })
} catch(error) {
    message.channel.send("Huvo un error, 3 posibles problemas: \n\n1:No tengo permisos para eliminar esos mensajes\n2: El mensaje tiene 14 dias de antiguedad\n3: Un problema que tiene que ver con nosotros")
    console.log("No se puedo borrar un mensaje, =>" + e)
}

 }

} 

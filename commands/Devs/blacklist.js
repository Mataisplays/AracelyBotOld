const Discord = require('discord.js'); // Definimos discord
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); //Definimos algunas cosas qye nos serviran de discord.js 
const blacklist = require('../../models/blacklist') //Definimos el Schema
module.exports = {///Exportamos
  name: "blacklist",//Nombre 
  alias: ["bl"],//Aliases
  description: "Añade un usuario a la blacklist",//Descripcion
  usage: "add {Usuario} {Razon}, remove {Usuario}, list",//Uso
  perms: [],
  clientperms: [""],

async execute (client, message, args){//Ejecutamos
if(message.author.id !== "726159353970819102") return message.channel.send('Este comando solo lo pueden usar mis dueños')//Remplazen mi id por la suya

let type = args[0]//definimos tipo

switch(type){//hacemos un switch
    case "add":
        let user = message.mentions.users.first() || await client.users.fetch(args[1])//Definimos user

        if(!user) return message.channel.send('No he encontrado a ese usuario')//Si no menciono a alguien o ingreso una id invalida
         
        let razon = args.slice(2).join(" ") || "No especificado"//Razon

        let isHere = await blacklist.findOne({ id: user.id})//Buscamos si el usuario esta en la blacklist

        let save = new blacklist({//Hacemos un collection nuevo (o no se como se llama esto)
            id: user.id,//la id del usuario
            reason: razon//la razon
        })

        isHere ?  await blacklist.updateOne({ id: user.id}, {reason: razon}) : await save.save()//Hacemos que si ya estaba lo actualize y si no guarde la info

        let embed = new MessageEmbed()//Embed
        .setTitle('Listo!')
        .setDescription('Se a añadido al usuario ' + `${user.tag} a la blacklist`)
        .setColor('GREEN')
        message.channel.send({ embeds: [embed]})

        break;//Rompemos

        case "remove"://ahora en caso remove

            let usere = message.mentions.users.first() || client.users.resolve(args[1]) //Definimos usere

            if(!usere) return message.channel.send('No he encontrado a ese usuario')//Si no menciono a alguien o ingreso una id invalida

            let isHeree = await blacklist.findOne({ id: usere.id}) //Buscamos si el usuario esta en la blacklist
 
            if(!isHeree) return message.channel.send('No esta en el blacklist ese usuario') // si no esta retorna

            await blacklist.deleteOne({ id: usere.id})// lo borramos de la blacklist

            let embede = new MessageEmbed()//Embed
            .setTitle('Listo!')
            .setDescription('Se a eliminado al usuario ' + `${user.tag} a la blacklist`)
            .setColor('GREEN')
            message.channel.send({ embeds: [embede]})

            break;//Rompemos
    }//acaba switch
}//acaba el execute

} //acaba el module.exports

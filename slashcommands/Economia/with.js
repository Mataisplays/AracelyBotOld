const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 
const eco = require('../../models/economy')
const bank = require('../../models/bank')
const { SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {//exportamas
    data: new SlashCommandBuilder()
    .setName('retirar')
    .setDescription('Saca dinero del banco')
    .addIntegerOption(x => x.setName('cantidad').setDescription('La cantidad a retirar').setRequired(true)),
    async execute(client, interaction){

        const user = interaction.user; const server = interaction.guild


let db = await eco.findOne({ user: user.id})

if(!db){

  let dou = new eco({ 
    user: user.id,
    money: 0
  }) 
  await dou.save()

  return interaction.reply("Tus datos han sido guardados, vuelve a usar el comando")
}
let dbbank = await bank.findOne({ user: user.id})

if(!dbbank){
  let dou = new bank({ 
    user: user.id,
    money: 0
  }) 
  await dou.save()

  return interaction.reply("Tus datos sobre el banco han sido guardados, vuelve a usar el comando")
}

let dinerototal = db.money
let dinerobancototal = dbbank.money

let dinero = args[0]
if(!dinero) return interaction.reply("Menciona una cantidad")
if(dinerobancototal < 1) return interaction.reply("No tienes nada en el banco")

if(dinero.toLowerCase() === "all"){
  await bank.findOneAndUpdate({ user: user.id}, {money: 0})
   await eco.findOneAndUpdate({ user: user.id}, {money: dinerototal + dinerobancototal})

  let embed = new MessageEmbed()
  .setTitle("Economia")
  .setDescription(`Se han sacado ${dinerototal} 🍩 donas, cuidado que te las roben`)
  .setColor("GREEN")

  return interaction.reply({embeds: [embed]})

}

if (isNaN(dinero))

return interaction.reply("La cantidad mencionada no es un numero");

if (dinero < 1)

return interaction.reply("La cantidad debe ser mayor a 0");

if (dinero.includes("."))

return interaction.reply("No puedes poner decimales");

if (dinero > dinerobancototal)

return interaction.reply("No puedes poner mas dinero del que tienes");

await eco.findOneAndUpdate({  user: user.id}, {money: dinerototal + dinero})

await bank.findOneAndUpdate({  user: user.id}, {money: dinerobancototal - dinero})

let embed = new MessageEmbed()
.setTitle("Economia")
.setDescription(`Se han sacado ${dinero} 🍩 donas electronicas, cuidado que te las roben`)
.setColor("GREEN")

return interaction.reply({embeds: [embed]})
        
        }
     }
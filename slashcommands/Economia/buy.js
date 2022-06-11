const { SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const inv = require('../../models/inventory')
const eco = require('../../models/economy')

module.exports = {//exportamas
    data: new SlashCommandBuilder()
    .setName('comprar')
    .setDescription('Comprate algo de la tienda y arrepientete de tu existencia')
    .addNumberOption(x => x.setName('id').setDescription('La id del producto que quieres').setRequired(true)),
    async execute(client, interaction){
        
        
let producto = interaction.options.getNumber('id')



let db = await inv.findOne({
  user: interaction.user.id
})

if(!db){
  let xd = new inv({
    user: interaction.user.id,
    inventory: []
  })

let dbeco = await eco.findOne({ user: interaction.user.id})
if(!dbeco){
  new eco({
    user: interaction.user.id,
    money: 0
  }).save()
  return interaction.reply("Tus datos han sido guardados, vuelve a usar el comando")
}

  await xd.save()
  return interaction.reply("Tus datos han sido guardados, vuelve a usar el comando")
}

let inventory = db.inventory

  let newInv = []

 
switch(producto){
  case "1":

  if(inventory.filter(x => x === "1").length > 0) return interaction.reply("Ya tienes ese producto")
  newInv.push('1')

  if(!dbeco < 400) return interaction.reply("No tienes suficiente dinero")

  await inv.findoOneAndUpdateOne({ user: interaction.user.id },{ $push: { inventory: newInv } });
  await eco.findOneAndUpdateOne({ user: interaction.user.id}, {money: dbeco.money - 400})

 interaction.reply('Se ha comprado el objeto **Caña de pescar** exitosamente')
  break;

  default: interaction.reply('Ese producto no es valido')
}


        }
     }
const { SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const eco = require('../../models/economy')
const bank = require('../../models/bank')
const moneys = require('../../models/specialmoney')

module.exports = {//exportamas
    data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Muestra tu dinero')
    .addUserOption(x => x.setName('usuario').setDescription('El usuario a mencionar')),
    async execute(client, interaction){

        
const mention = interaction.options.getUser('usuario') || interaction.user

async function banco(user){
 
    let db = await bank.findOne({ user: user});
    if (db) {
      return db.money;
    } else {
      return 0;
    }
}

async function dinero(user){
 
  let db = await eco.findOne({ user: user});
  if (db) {
    return db.money;
  } else {
    return 0;
  }
}

async function vainilla(user){
 
  let db = await moneys.findOne({ user: user});
  if (db) {
    return db.vainilla;
  } else {
    return 0;
  }
}

let money = await dinero(mention.id)
let robo = await banco(mention.id)
let vainnillaxd = await vainilla(mention.id)
const embed = new MessageEmbed()
.setTitle("Donas de " + mention.tag)
.addField("Donas 🍩", `${money}`, true)
.addField("Donas electronicas 🍩", `${robo}`, true)
.addField("Total", `${robo + money}`)
.addField("Donas de vainilla <:vainilla_donuts:919747345162309652>", `${vainnillaxd}`, true)
.setColor("ORANGE")

interaction.reply({embeds: [embed]})
        
        }
     }
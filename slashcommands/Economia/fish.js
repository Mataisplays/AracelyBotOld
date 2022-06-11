const { SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')


module.exports = {//exportamas
    data: new SlashCommandBuilder()
    .setName('fish')
    .setDescription('Pesca un pez :D'),
    async execute(client, interaction){

        const db = await inv.findOne({ user: interaction.user.id })
if(!db){
    const XD = new inv({
        user: interaction.user.id,
        inventory: []
    })
    await XD.save()
    return interaction.reply('Tus datos han sido guardados, vuelve a usar el comando')
}
const dbeco = await eco.findOne({ user: interaction.user.id })
if(!dbeco){
    const pndjo = new eco({
        user: interaction.user.id,
        money: 0
    })
    await pndjo.save()
}

  if(!db.inventory.includes('1')) return  interaction.reply('No tienes una caña de pescar!')
   let fishes = [
  {
    fish: "Pescadito",
    prize: Math.floor(Math.random() * (50 - 10)) + 10
  },
  {
    fish: "Pez mediano",
    prize: Math.floor(Math.random() * (100 - 50)) + 10
  },
  {
    fish: "Salmon",
    prize: Math.floor(Math.random() * (150 - 100)) + 10
  },
  {
    fish: "Pez tropical",
    prize: Math.floor(Math.random() * (200 - 150)) + 10
  },
  {
    fish: "Nemo",
    prize: 200
  },
  {
    fish: "Caja sospechosa",
    prize: Math.floor(Math.random() * (600 - 30)) + 10
  },
  {
    fish: "Un mentalidad de tiburon",
    prize: Math.floor(Math.random() * (25 - 0)) + 10
  },
  {
    fish: "Mounstro del lago nes",
    prize: Math.floor(Math.random() * (1000 - 500)) + 10
  },
  {
    fish: "Pescadito",
    prize: Math.floor(Math.random() * (50 - 10)) + 10
  },
  {
    fish: "Pez mediano",
    prize: Math.floor(Math.random() * (100 - 50)) + 10
  },
  {
    fish: "Salmon",
    prize: Math.floor(Math.random() * (150 - 100)) + 10
  },
  {
    fish: "Pez tropical",
    prize: Math.floor(Math.random() * (200 - 150)) + 10
  },
  {
    fish: "Nemo",
    prize: 200
  },
  {
    fish: "Pescadito",
    prize: Math.floor(Math.random() * (50 - 10)) + 10
  },
  {
    fish: "Pez mediano",
    prize: Math.floor(Math.random() * (100 - 50)) + 10
  },
  {
    fish: "Salmon",
    prize: Math.floor(Math.random() * (150 - 100)) + 10
  },
  {
    fish: "Pez tropical",
    prize: Math.floor(Math.random() * (200 - 150)) + 10
  },
  {
    fish: "Nemo",
    prize: 200
  },
  {
    fish: "Pescadito",
    prize: Math.floor(Math.random() * (50 - 10)) + 10
  },
  {
    fish: "Pez mediano",
    prize: Math.floor(Math.random() * (100 - 50)) + 10
  },
  {
    fish: "Salmon",
    prize: Math.floor(Math.random() * (150 - 100)) + 10
  },
  {
    fish: "Pez tropical",
    prize: Math.floor(Math.random() * (200 - 150)) + 10
  },
  {
    fish: "Nemo",
    prize: 200
  },
  ]

  let fish = fishes[Math.floor(Math.random() * fishes.length)]

  eco.findOneAndUpdate({user: interaction.user.id}, {money: dbeco.money + fish.prize})

  let embed = new MessageEmbed()
  .setTitle('Pesca exitosa')
  .setDescription(`Has pescado un **${fish.fish}**, lo vendiste y te dieron ${fish.prize} donas 🍩`)
  .setColor("GREEN")

  interaction.reply({ embeds: [embed]})
        
        }
     }
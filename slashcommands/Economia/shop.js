const { SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')


module.exports = {//exportamas
    data: new SlashCommandBuilder()
    .setName('shop')
    .setDescription('Mira la tienda y ve algo que quieras'),
    async execute(client, interaction){

        /*
Objetos planeados:

Caña de pescar - 400

Caja de donas - 5 donas de vainilla

Caja de donas de vainilla - 2 donas dou

*/
let productos = [
    {
      name: 'Caña de pescar',
      description: 'Te permitira usar el comando /fish',
      prize: 400
    }
  ]
  
  
  
    const embed = new MessageEmbed()
    .setTitle("Tienda")
    .setDescription(productos.map((x, i) => `ID: ${i + 1}\nDescripcion: ${x.description}\nPrecio: ${prize}`).join(" \n\n"))
    .setFooter(`puedes comprar esos objetos con /buy { id }`)
    .setColor("RANDOM")
    interaction.reply({ embeds: [embed]})
        
        }
     }
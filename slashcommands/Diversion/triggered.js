const { SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed, MessageAttachment } = require('discord.js')
const Discord = require('discord.js')
const Zeew = require('zeew')

module.exports = {//exportamas
    data: new SlashCommandBuilder()
    .setName('triggered')
    .setDescription('Has una foto de alguein que se enojo ')
    .addUserOption(x => x.setName('usuario').setDescription('El usuario a hacerle la imagen')),
    async execute(client, interaction){
        
        

    let user = interaction.options.getUser('usuario')  || interaction.user;
    const img = new Zeew.img(process.env.zeew);
    let enviar = await img.filter.triggered(user.displayAvatarURL({ format: "jpg"}))
    let att = new MessageAttachment(enviar, "triggered.gif")





    interaction.reply({ files: [att],embeds: [new MessageEmbed().setTitle(`${user.tag} esta enojao >:(`).setImage("attachment://triggered.gif").setColor("ORANGE")]})

        }
     }
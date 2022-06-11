const { SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')


module.exports = {//exportamas
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Muestra el avatar de un usuario')
    .addUserOption(u => u.setName('usuario').setDescription('El usuario del que quieres su avatar'))
    ,
    async execute(client, interaction){
  
        const user = interaction.options.getUser('usuario') || interaction.user

        let embed = new MessageEmbed()
        .setTitle(`Avatar de ${user.nickname ? user.nickname : user.tag}`)
        .setDescription(`[[PNG]](${user.displayAvatarURL({ format: "png" }) }) [[JPG]](${user.displayAvatarURL({ format: "jpg" }) }) [[GIF]](${user.displayAvatarURL({ format: "gif" }) }) [[WEBP]](${user.displayAvatarURL() })`)
        .setImage(user.displayAvatarURL({dynamic: true, size: 1024 }))
        .setColor("RANDOM")
        .setImage(user.displayAvatarURL())

        interaction.reply({ embeds: [embed]})

        }
     }
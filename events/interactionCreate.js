const Discord = require("discord.js"); //npm i discord.js
const fs = require("fs");
let blacklist = require("../models/blacklist");
const { MessageEmbed } = require("discord.js");
module.exports = async (client, interaction) => {
  //esportamos cliente

  if (interaction.isCommand()) {
    let cmd = client.slashcommands.get(interaction.commandName);

    if (!cmd) return;

    if (cmd) {
      let userblacklist = await blacklist.findOne({ id: interaction.user.id }); //Buscamos al autor del mensaje en la db
      if (userblacklist)
        return interaction.reply({
          content:
            "Estas en mi blacklist no puedes usar mis comandos, contacta a un developer por si crees que fue un error",
          ephemeral: true,
        }); //Si esta retorne
      try {
        cmd.execute(client, interaction);
      } catch (e) {
        interaction.reply(
          "Huvo un error, usa el comando reportbug para reportarlo!"
        );
      }
    }
  }
  
  if(interaction.isButton()){
    if(interaction.customId === "ticketcreate") {
      if(interaction.guild.channels.cache.filter(x => x.name.includes(interaction.user.username) && !x.parentId).size > 0) return interaction.reply({ content: 'Ya as creado un ticket', ephemeral: true})
    let ticket = await interaction.guild.channels.create(`Ticket de ${interaction.user.username}`, {
       permissionOverwrites : [
         {
           id: interaction.guild.id,
           deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
         },
         {
          id: interaction.user.id,
          allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
        }
        ],
        reason: "Ticket creado"

     }) 
     let embed = new Discord.MessageEmbed()
     .setTitle('Tickets')
     .setDescription(`Bienvenido ${interaction.user}, espera a que un staff atienda a tu ticket`)
     .setColor('RANDOM')
     
     let row = new Discord.MessageActionRow()
     .addComponents(
       new Discord.MessageButton()
       .setLabel('Eliminar ticket')
       .setStyle('DANGER')
       .setCustomId('ticketdelete')

       
     )

     ticket.send({ content: interaction.user.toString(), embeds: [embed], components: [row]})
    }else if(interaction.customId === 'ticketdelete'){
      interaction.channel.delete({ reason: " Ticket borrado"})
    }
  }
};

const { SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const Discord = require('discord.js')
const ms = require('ms')
const fs = require('fs')

module.exports = {//exportamas
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Obten mis comandos'),
    async execute(client, interaction){

        if (!false) {

            /**
             * 
             * @param {String} emoji la id del emoji 
             * @returns 
             */
            
                  function buscaremoji(emoji){
                    let emojiXD = client.emojis.cache.find(x => x.id === emoji)
                    return emojiXD
                  }
            
                  const principal = new MessageEmbed()
                    .setTitle("COMANDOS")
                    .addField("⠀", `${buscaremoji("912536474757500959")} **- Muestra los comandos de moderacion**\n\n` + `${buscaremoji("912534223053799434")} **- Muestra los comandos de staff**\n\n` + `${buscaremoji("912538311585828945")} **- Muestra los comandos de economia**\n\n` + `${buscaremoji("862391037421944892")} **- Muestra los comandos de diversion**\n\n` + `${buscaremoji("862303149409435689")} **- Muestra los comandos de configuracion**\n\n` + `${buscaremoji("862491215693479946")} **- Muestra los comandos de utilidad**`)
                    .setFooter("El menu expira a los 5 minutos")
                    .setColor("RANDOM");
            
            
            
            
            
                  const row = new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                      .setCustomId("menu")
                      .setPlaceholder("Selecciona algo :c")
                      .addOptions([
                        {
                          label: "Volver",
                          description: "Vuelve al embed principal",
                          emoji: "⬅",
                          value: "volver",
                        },
                        {
                          label: "Moderacion",
                          description: "Muestra los comandos de moderacion",
                          value: "moderacion",
                          emoji: `${buscaremoji("912536474757500959")}`
                        },
                        {
                          label: "Staff",
                          description: "Muestra los comandos de utilidad",
                          value: "staff",
                          emoji: buscaremoji("912534223053799434")
                        },
                        {
                          label: "Economia",
                          description: "Muestra los comandos de economia",
                          value: "economia",
                          emoji: buscaremoji("912538311585828945")
                        },
                        {
                          label: "Diversion",
                          description: "Muestra los comandos de diversion",
                          value: "diversion",
                          emoji: buscaremoji("862391037421944892")
                        },
                        {
                          label: "Configuracion",
                          description: "Muestra los comandos de configuracion",
                          value: "configuracion",
                          emoji: buscaremoji("862303149409435689")
                        },
                        {
                          label: "Utilidad",
                          description: "Muestra los comandos de utilidad",
                          value: "utilidad",
                          emoji: buscaremoji("862491215693479946")
                        },
                      ])
                  );
            
                  const msg = await interaction.reply({
                    embeds: [principal],
                    components: [row],
                  });
            
                  const filter = (i) => i.isSelectMenu() 
                  const collector = interaction.channel.createMessageComponentCollector({
                    filter,
                    time: ms("5m"),
                  });
            
                  
              collector.on("collect", async i => {
            
                if(i.user.id !== interaction.user.id) return interaction.reply({ content: `Solo ${interaction.user} puede hacer eso!`, ephemeral: true})     
              
                if (i.values[0] === "volver") {
                       i.update({ embeds: [principal] });
                     }
             
                 if (i.customId === "menu") {
                   if (i.values[0] === "economia") {
                     let commandFiles = fs.readdirSync("./commands/Economia");
                     let categories = [];
                     for (const file of commandFiles) {
                       const command = require(`../../commands/Economia/${file}`);
                       categories.push({
                         name:  `${command.name} ${command.usage}`,
                         value: command.description,
                       });
                     }
             
                     i.update({
                       embeds: [
                         new MessageEmbed()
                           .setTitle("Comandos de Economia")
                           .addFields(categories)
                           .setColor("GREEN"),
                       ],
                     });
                   }
             
                   if (i.values[0] === "diversion") {
                     let commandFiles = fs.readdirSync("./commands/Diversion");
                     let categories = [];
                     for (const file of commandFiles) {
                       const command = require(`../../commands/Diversion/${file}`);
                       categories.push({
                         name: `${command.name} ${command.usage}`,
                         value: command.description,
                       });
                     }
                     i.update({
                       embeds: [
                         new MessageEmbed()
                           .setTitle("Comandos de Diversion")
                           .addFields(categories)
                           .setColor("GREEN"),
                       ],
                     });
                   }
             
                   if (i.values[0] === "moderacion") {
                     let commandFiles = fs.readdirSync("./commands/Moderacion");
                     let categories = [];
                     for (const file of commandFiles) {
                       const command = require(`../../commands/Moderacion/${file}`);
                       categories.push({
                         name: `${command.name} ${command.usage}`,
                         value: command.description,
                       });
                     }
                     i.update({
                       embeds: [
                         new MessageEmbed()
                           .setTitle("Comandos de Moderacion")
                           .addFields(categories)
                           .setColor("GREEN"),
                       ],
                     });
                   }
             
                   if (i.values[0] === "configuracion") {
                     let commandFiles = fs.readdirSync("./commands/Configuracion");
                     let categories = [];
                     for (const file of commandFiles) {
                       const command = require(`../../commands/Configuracion/${file}`);
                       categories.push({
                         name: `${command.name} ${command.usage}`,
                         value: command.description,
                       });
                     }
                     i.update({
                       embeds: [
                         new MessageEmbed()
                           .setTitle("Comandos de Configuracion")
                           .addFields(categories)
                           .setColor("GREEN"),
                       ],
                     });
                   }
                   if (i.values[0] === "utilidad") {
                     let commandFiles = fs.readdirSync("./commands/Utilidad");
                     let categories = [];
                     for (const file of commandFiles) {
                       const command = require(`../../commands/Utilidad/${file}`);
                       categories.push({
                         name: `${command.name} ${command.usage}`,
                         value: command.description,
                       });
                     }
                     i.update({
                       embeds: [
                         new MessageEmbed()
                           .setTitle("Comandos de Utilidad")
                           .addFields(categories)
                           .setColor("GREEN"),
                       ],
                     });
                   }
                   if (i.values[0] === "staff") {
                    let commandFiles = fs.readdirSync("./commands/Staff");
                    let categories = [];
                    for (const file of commandFiles) {
                      const command = require(`../../commands/Staff/${file}`);
                      categories.push({
                        name: `${command.name} ${command.usage}`,
                        value: command.description,
                      });
                    } //
                    i.update({
                      embeds: [
                        new MessageEmbed()
                          .setTitle("Comandos de Staff")
                          .addFields(categories)
                          .setColor("GREEN"),
                      ],
                    });
                  }
                 }
            
              })
            
              collector.on("end", async (c) =>{
                   msg.edit('El help a caducado, renuevalo usando de nuevo el comando')
              })
              
              }
        
        }
     }
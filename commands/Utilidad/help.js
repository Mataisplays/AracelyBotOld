const Discord = require("discord.js");
const {
  Client,
  MessageEmbed,
  Collection,
  Guild,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");
const ms = require("ms");
const fs = require("fs");

module.exports = {
  name: "help",
  alias: ["h", "ayuda"],
  description: "muestra los comandos",
  usage: "[ comando ]",
  perms: [],
  clientperms: ["USE_EXTERNAL_EMOJIS"],

  async execute(client, message, args) {

    let anuncio = {
      name: "Anuncio: Nuevo apartado de anuncio",
      value: "Aca se anunciaran cosas sobre el bot si no estas en el futuro servidor de soporte.",
    };
    if (!args[0]) {

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
        .setDescription(
          `Si quieres ver el uso de un comando pon esto: \`${client.prefix}help userinfo\``                               
        )
        .addField("⠀", `${buscaremoji("912536474757500959")} **- Muestra los comandos de moderacion**\n\n` + `${buscaremoji("912534223053799434")} **- Muestra los comandos de staff**\n\n` + `${buscaremoji("912538311585828945")} **- Muestra los comandos de economia**\n\n` + `${buscaremoji("862391037421944892")} **- Muestra los comandos de diversion**\n\n` + `${buscaremoji("862303149409435689")} **- Muestra los comandos de configuracion**\n\n` + `${buscaremoji("862491215693479946")} **- Muestra los comandos de utilidad**\n\n⠀`)
        .addFields([anuncio])
        .setFooter("Hola c:")
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

      const msg = await message.reply({
        embeds: [principal],
        components: [row],
      });

      const filter = (i) => i.isSelectMenu() && i.user.id === message.author.id
      const collector = message.channel.createMessageComponentCollector({
        filter,
        time: ms("5m"),
      });

      
  collector.on("collect", async i => {

    if(i.user.id !== message.author.id) return interaction.reply({ content: `Solo ${message.author} puede hacer eso!`, ephemeral: true})     
  
    if (i.values[0] === "volver") {
           i.update({ embeds: [principal] });
         }
 
     if (i.customId === "menu") {
       if (i.values[0] === "economia") {
         let commandFiles = fs.readdirSync("./commands/Economia");
         let categories = [];
         for (const file of commandFiles) {
           const command = require(`../Economia/${file}`);
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
           const command = require(`../Diversion/${file}`);
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
           const command = require(`../Moderacion/${file}`);
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
           const command = require(`../Configuracion/${file}`);
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
           const command = require(`../Utilidad/${file}`);
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
          const command = require(`../Staff/${file}`);
          categories.push({
            name: `${command.name} ${command.usage}`,
            value: command.description,
          });
        }
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
}}

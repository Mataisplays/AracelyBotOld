const Discord = require("discord.js");
const { Client, MessageEmbed, Collection, Guild } = require("discord.js");
let fs = require("fs");
let ms = require("ms");
let blacklist = require("../models/blacklist");
let PermsArray = require(`../functions/getPermissionName`);

module.exports = async (client, message) => {
  if (message.channel.type === "DM") return;
  ////////////////////////////////PREFIX////////////////////////////////////

  const prefix_db = require("../models/prefix");



  let customprefix = await prefix_db.findOne({ idguild: message.guild.id });
  if(customprefix) {
    prefixx = customprefix.prefix
  }else{
    prefixx = "$"
  }


  let prefix = prefixx.toLowerCase();

  client.prefix = prefix;

  //////////////////////////////////!PREFIX///////////////////////////////////////////////

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) {
    if (message.embeds.length > 0 && !message.author.bot && message.embeds[0].type == 'rich')
      message.reply("Watafak un embed en un usuario que no es bot :0");
    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
      message.channel.send(
        `Hola! soy <@${client.user.id}> Y estoy listo para ayudar! porfavor para ver mis comandos usa ${prefix}help !!`
      );
    }
    if(message.content.includes("https://dlscord-boost.com")){
      message.delete()
    }
    return;
  }

  if (!message.content.toLowerCase() === prefix) return;

  let usuario = message.mentions.members.first() || message.member;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.content.length < 2) return;

  let cmd = client.commands.find(
    (c) => c.name === command || (c.alias && c.alias.includes(command))
  );
  if (cmd) {
    let userblacklist = await blacklist.findOne({ id: message.author.id }); //Buscamos al autor del mensaje en la db
    if (userblacklist)
      return message.channel.send(
        "Estas en mi blacklist no puedes usar mis comandos, contacta a un developer por si crees que fue un error"
      ); //Si esta retorne

    let perms_array = await PermsArray();

    if (!message.member.permissions.has(cmd.perms))
      return message.channel.send(
        `No tienes los permisos: **${perms_array[cmd.perms.map((x) => x)]}**`
      );
      cmd.clientperms.push("EMBED_LINKS")
      if (!message.guild.me.permissions.has(cmd.clientperms))
        return message.channel.send(
          `No tengo los permisos: **${perms_array[cmd.clientperms.map((x) => x)]}**`
        );

 



async function buscarinviteolink(type, msg){
  let a  = require('../functions/linkRegex')
  let xd = await a(type, msg)

  return xd

}

let lol = await buscarinviteolink("link", message.content) 

if(lol && !message.member.permissions.has("MANAGE_MESSAGES")) return message.reply('No puedes poner links o invitaciones en uno de mis comandos')

    try {

     
      cmd.execute(client, message, args);
    

    } catch (error) {
      
      const embedError = new MessageEmbed()
        .setTitle("Huvo un error!")
        .setDescription(
          `Reportalo con ${prefix}reportbug o usa el servidor de soporte`
        )
        .addField(
          "Servidor de soporte de soporte",
          "[Click aqui](https://discord.gg/S4CuZDfmxS)"
        )
        .addField("Error", `\`\`\`js\n${error}\`\`\``)
        .setColor("RED");
      message.channel.send({ embeds: [embedError] });
      console.log(error);
    }
  } else {
    if (!cmd) {
      const OppsEmbed = new MessageEmbed()
        .setTitle("Oops")
        .setDescription(
          `Parece que el comando **${command}** no existe!, utiliza ${prefix}ayuda para poder obtener ayuda`
        )
        .setColor("RED");

      message.channel
        .send({ embeds: [OppsEmbed] })
        .then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, ms("5s"));
        })
        .catch(console.error);
    }
  }
};

const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
  //exportamas
  data: new SlashCommandBuilder()
    .setName("addrole")
    .setDescription("Añade un rol a un usuario")
    .addUserOption((x) =>
      x
        .setName("usuario")
        .setDescription("El usuario al que le daras el rol")
        .setRequired(true)
    )
    .addRoleOption((x) =>
      x
        .setName("rol")
        .setDescription("Rol a dar al usuario ya mencionado")
        .setRequired(true)
    ),
  async execute(client, i) {

    let miembro = i.options.getMember('usuario')

    let rol = i.options.getRole('rol')


    if (rol.managed)
      return i.reply("El rol es de una integracion");
    if (rol.position > i.member.roles.highest.position)
      return i.reply(
        "Ese rol es mas alto que el mas alto que tienes tu"
      );
    if (i.guild.me.roles.highest.position <= rol.position)
      return i.reply("No puedo ponerle ese rol al usuario");

    let rolArray = miembro.roles.cache.map((x) => x.id);

    if (rolArray.includes(rol.id))
      return i.reply("El usuario ya tiene ese rol");

    try {
      miembro.roles.add(rol.id);
    } catch (e) {
      console.log(e);
      i.reply("Ha ocurrido un error");
      return;
    }
    const embed = new MessageEmbed()
      .setTitle("Rol dado exitosamente")
      .setDescription(`Se le ha dado el rol ${rol} a ${miembro}`)
      .setColor("GREEN")
      .setTimestamp();

    i.reply({ embeds: [embed] });
  }
};

const Discord = require("discord.js");
const { Client, MessageEmbed, Collection, Guild } = require("discord.js");
const eco = require("../../models/economy");
const bank = require("../../models/bank");
const { SlashCommandBuilder} = require('@discordjs/builders')

module.exports = {//exportamas
    data: new SlashCommandBuilder()
    .setName('depositar')
    .setDescription('Deposita tu dinero al banco'),
    async execute(client, interaction){

        
    let db = await eco.findOne({ user: interaction.user.id });
    if (!db) {
      let dou = new eco({
        user: interaction.user.id,
        money: 0,
      });
      await dou.save();

      return interaction.reply(
        "Tus datos han sido guardados, vuelve a usar el comando"
      );
    }
    let dbbank = await bank.findOne({ user: interaction.user.id });
//
    if (!dbbank) {
      let dou = new bank({
        user: interaction.user.id,
        money: 0,
      });
      await dou.save();

      return interaction.reply(
        "Tus datos han sido guardados, vuelve a usar el comando"
      );
    }

    const server = interaction.guild;
    const user = interaction.user;
    const dinero = args[0];
    if (!dinero) return interaction.reply("Menciona una cantidad");
    let dinerototal = db.money;
    let electronicototal = dbbank.money;
    if (dinerototal < 1)
      return interaction.reply("No tienes nada en el banco");
    if (dinero.toLowerCase() === "all") {
      await eco.findOneAndUpdate({ user: user.id }, { money: 0 });
      await bank.findOneAndUpdate(
        { user: user.id },
        { money: electronicototal + dinerototal }
      );
      let embed = new MessageEmbed()
        .setTitle("Economia")
        .setDescription(`Has metido al banco **${dinerototal}** 🍩 donas!`)
        .setColor("GREEN");
      return interaction.reply({ embeds: [embed] });
    }

    if (isNaN(dinero))
      return interaction.reply("La cantidad mencionada no es un numero");
    if (dinero < 1)
      return interaction.reply("La cantidad debe ser mayor a 0");
    if (dinero.includes("."))
      return interaction.reply("No puedes poner decimales");
    if (dinero > dinerototal)
      return interaction.reply("No puedes poner mas dinero del que tienes");

    await eco.findOneAndUpdate(
      { user: user.id },
      { money: dinerototal - Number(dinero) }
    );
    await bank.findOneAndUpdate(
      { user: user.id },
      { money: electronicototal + Number(dinero) }
    );

    let embed = new MessageEmbed()
      .setTitle("Economia")
      .setDescription(`Has metido al banco **${dinero}** 🍩 donas!`)
      .setColor("GREEN");
      interaction.reply({ embeds: [embed] });
        
    }
}
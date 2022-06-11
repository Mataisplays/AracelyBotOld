const Discord = require("discord.js")
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 

module.exports = (client, reaction, user) => {
  
   if(reaction.message.id === "913884465447723079"){

    let embed = new MessageEmbed()
    .setTitle(reaction.message.embeds[0].title)
    .setDescription(reaction.message.embeds[0].description)
    .setColor('RANDOM')

    reaction.message.edit({ embeds: [embed] })
}

if(reaction.message.id === "922632032335568907"){

    if(reaction.emoji.name !== "🌭") return reaction.users.remove(user.id);

    let member = reaction.message.guild.members.cache.get(user.id);
    member.roles.add("847625681197989929");
    reaction.users.remove(user.id);
}

}
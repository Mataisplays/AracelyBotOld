const Discord = require('discord.js');
const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); 
const eco = require('../../models/economy')
const ms = require("ms")
const moneys = require('../../models/specialmoney')
const { SlashCommandBuilder} = require('@discordjs/builders')


module.exports = {//exportamas
    data: new SlashCommandBuilder()
    .setName('work')
    .setDescription('Haz que la economia funcione lol'),
    async execute(client, interaction){

      const cooldown = client.workCooldown

        if(cooldown.has(interaction.user.id)){

            interaction.reply(`Vaya!, no puedes usar ese comando durante 30 segundos, es cansado que lo usen a cada rato!`)
            
            return;
            
        }
        cooldown.add(interaction.user.id);
        setTimeout(() => {
          cooldown.delete(interaction.user.id);
        }, ms("30s"))
            
        let trabajos = ["Bombero", "Policia", "Streamer", "Empresario", "Minero", "Cripto Minero"]
        const trabajo = trabajos[Math.floor(Math.random()* trabajos.length )]
        let moneyNow = Math.floor(Math.random()* (1000 - 300) + 300)
        const db = await eco.findOne({ user: interaction.user.id })
            
            
            
        if(db){
            let money = parseInt(db.money)
            await eco.updateOne({ user: interaction.user.id}, {money: money + moneyNow })
        }else{
        let ola = new eco({
                user:interaction.user.id,
                money: moneyNow //
              })
              await ola.save()
            }
            
            
            const embed = new MessageEmbed()
            .setTitle("Trabajo")
            .setDescription(`${interaction.user} ha trabajado de ${trabajo}, ha ganado ${moneyNow} donas 🍩`)
            .setColor("GREEN")
            .setTimestamp()
            
            let posiblesVainilla = Math.floor(Math.random() * (40 - 1)) + 1
            
            if(posiblesVainilla > 35){
            
              const dba = await eco.findOne({ user: interaction.user.id })
            
            let a = Math.floor(Math.random() * (40 - 1)) + 1
            let xd = Math.floor(Math.random() * (5 - 1)) + 1
            console.log(a)
            if(dba){
              let money = parseInt(db.vainilla)
              await moneys.updateOne({ user: interaction.user.id}, {money:  money + xd})
            }else{
              
              let ola = new moneys({
                user: interaction.user.id,
                vainilla: xd
              })
              await ola.save()
            }
            // 
            embed.addField("ㅤ", "Has ganado " + xd + " donas de vainilla <:vainilla_donuts:919747345162309652>")
            
            }
            
            
            
            interaction.reply({embeds: [embed]})
        
        }
     }
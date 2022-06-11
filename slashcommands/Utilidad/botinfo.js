const { SlashCommandBuilder} = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const os = require('os');

module.exports = {//exportamas
    data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Muestra informacion acerca del bot'),
    async execute(client, interaction){
        



            
            
        let owner = client.users.cache.get("726159353970819102")
        
        
function duration(ms){
  const sec = Math.floor((ms / 1000) % 60).toString()
  const min = Math.floor((ms / (60 * 1000)) % 60).toString()
  const hrs = Math.floor((ms / (60 * 60 * 1000)) % 60).toString()
  const days = Math.floor((ms / (24 * 60 *60 * 1000))).toString()
  return `${days} Dias, ${hrs} Horas, ${min} Minutos, ${sec} Segundos`
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [min], s [sec]")
}
        
        
        const botinfo = new Discord.MessageEmbed()
          .setAuthor(`Informacion del bot`, client.user.avatarURL())
          .setThumbnail(client.user.avatarURL({ size: 2048 }))
          .setDescription(`Esta es la informacion de ${client.user.tag}`)
          .addField("> <:server:911773502514815026> Servidores", `\`${client.guilds.cache.size}\``)
          .addField("> 🧑 Usuarios", `\`${client.users.cache.size}\``)
          .addField("> <:RoleIconOwner:911771152735678535> Dueño", `\`${owner.tag}\``)
          .addField("> ⏱ Creado el:", `<t:1621861754>`)
          .addField("> 😴 Tiempo sin apagarse: ", `\`${duration(client.uptime)}\``)
          .addField("> <:Question_mark:911770515214073876> Prefix del servidor: ", `\`${client.prefix}\``)
          .addField("> <:ram:911769053406826516>  Uso de RAM: ", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\``)
          .addField("> <:CPU:911769421230534698> CPU", `\`${os.cpus().map((i) => `${i.model}`)[0]}\``)
          .addField("> <:GoldenApple:911770100179304448> Sistema operativo", `\`${os.platform}\``)
          .addField("> <:js:911762383024832525>  Lenguaje: ", `\`Node.js ${process.version}\``)
          .addField("> <:djs:911765197809647627>Libreria: ", `\`Discord.js ${Discord.version}\``)
          .addField("> <:deluxe_link:921692795415199784> Invitame!", "[Clic aqui](https://bit.ly/3BEgpBs)")
          .setFooter(`Informacion del bot solicitada por ${interaction.user.username}`)
          .setColor("RANDOM");
        
        
          interaction.reply({embeds : [botinfo]});


        }
     }

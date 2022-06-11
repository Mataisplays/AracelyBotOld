
const fs = require('fs')
const discord = require('discord.js')
require('dotenv').config()
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

const commands = [] 


for(const folder of fs.readdirSync('./slashCommands')){

    for (const cfs of fs.readdirSync(`./slashCommands/${folder}`).filter(x => x.endsWith('.js')) ){
        const command = require(`../slashCommands/${folder}/${cfs}`)
        commands.push(command.data)
    }
    

}


const rest = new REST({ version: '9'}).setToken(process.env.token)



async function createSlash() {
    try{
    await rest.put( 
        Routes.applicationCommands('846374282418323507'), { //si queremos que los slash sean en un server especifico tendremos que poner en lugar de clientId pondremos clientId, guild
            body: commands 
        }
    )
        console.log('Slash commands cargados!')
    }catch(e){
console.error(e)
    }
}

createSlash()

const fs = require("fs");
const { readdirSync } = require("fs");
const { Collection } = require("discord.js");

module.exports = async (client) => {
  try {
    let slashFiles = readdirSync("./slashCommands");
    const commandFiles = fs
      .readdirSync("./commands")
      .filter((file) => file.endsWith(".js"));

    const commandFolders = fs.readdirSync("./commands");

    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const command = require(`../commands/${folder}/${file}`);
        client.commands.set(command.name, command);
      }
    }

    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      client.commands.set(command.name, command);
    }

    for (const file of readdirSync("./events")) {
      if (file.endsWith(".js")) {
        let fileName = file.substring(0, file.length - 3);

        let fileContents = require(`../events/${file}`);

        client.on(fileName, fileContents.bind(null, client));
      }
    }
    for (const folder of fs.readdirSync('./slashCommands')){
      for (const file of fs.readdirSync('./slashCommands/' + folder).filter(x => x.endsWith('.js'))) {
        const command = require(`../slashCommands/${folder}/${file}`);
        client.slashcommands.set(command.data.name, command);
      }    
    }

  } catch (e) {
    console.log(e);
  }
};

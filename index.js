const Discord = require("discord.js");
const { Client, Intents, MessageEmbed, Collection } = require("discord.js");
const client = new Client({
  intents: 32759,
  allowedMentions: { repliedUser: false, parse: ["users", "roles"]}
});
const  {GiveawaysManager} = require("discord-giveaways")

client.cooldowns = new Collection();
client.snipes = new Map();
client.commands = new Collection();
client.snipes = new Map();
client.slashcommands = new Collection();
client.workCooldown = new Set()
client.giveaways = new GiveawaysManager(client, {
  storage: './giveaways',
  default: { 
      botsCanWin: false,
      embedColor: '#5865F2',
      embedColorEnd: '#22C925',
      reaction: '921669211342913536'
  }
});

const config = require("./config.js");
const ms = require("ms");
require("./functions/mongodb");
require("./functions/registerSlash");
require("./functions/handlers")(client)
process.on("exit", async() => {
  console.log("Bot apagado :c")
})
process.on("unhandledRejection", (rej) => console.error(rej));
client.login(config.token);
const { GatewayIntentBits } = require('discord.js');
const acebot = require('./Utils/acebot');
const client = new acebot({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers] });
client.start();
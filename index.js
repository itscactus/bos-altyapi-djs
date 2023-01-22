import config from './config.json' assert {type: 'json'};
import fs from 'fs';
import loadEvents from './src/handlers/event.js';
import { Collection, Client, GatewayIntentBits, Partials } from 'discord.js';
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMembers
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildMember
    ]
})
client.commands = new Collection();
export default client;
loadEvents(client);
client.login(config.token);

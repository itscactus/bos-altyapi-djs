import { ApplicationCommandType, Client } from 'discord.js';
import fs from 'fs';
import client from '../../index.js';
/**
 * 
 * @param {Client} client 
 */
export async function loadCommands() {
    const cmdDirectories = fs.readdirSync('./src/commands/');
    let commands = [];
    await Promise.all(cmdDirectories.map(async(directory) => {
        let directoryCommands = fs.readdirSync('./src/commands/'+directory).filter(file => file.endsWith('.js'));
        await Promise.all(directoryCommands.map(async(cmd) => {
            const cmdP = (await import('../commands/' + directory + '/' + cmd)).default;
            commands.push(cmdP);
        }))
    }))
    await registerCommands(commands);
}
/**
 * 
 * @param {Client} client 
 * @param {String[]} commands 
 */
export async function registerCommands(commands) {
    const clientCommands = await client.application?.commands.fetch();
    await Promise.all(commands.map(async(cmd) => {
        client.commands.set(cmd.data.name, cmd);
        await client.application?.commands.create(cmd.data).then((command) => {
            console.log("[Komut] " + command.name + " oluşturuldu!")
        })
    }))
    clientCommands.forEach(async(cmd) => {
        if(client.commands.find(c => c.data.name == cmd.name)) return;
        console.log("[Komut] Silinmiş komut algılandı! " + cmd.name + " siliniyor..");
        await cmd.delete();
    })
}
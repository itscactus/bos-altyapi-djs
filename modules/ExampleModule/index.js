import { Client, SlashCommandBuilder } from "discord.js";
import { registerCommands } from "../../src/handlers/command.js";

/**
 * 
 * @param {Client} client 
 */
export async function onEnable(client) {
    const commands = [{
        data: new SlashCommandBuilder()
            .setName("test")
            .setDescription("test"),
        run: async(interaction, client) => {
            interaction.reply("test")
        }
    }]
    await registerCommands(commands)
    client.on("messageCreate", async(message) => {
        console.log(message.content)
    })
}
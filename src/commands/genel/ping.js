import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("gecikme")
        .setDescription("Botun Gecikmesi"),
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    run: async(interaction, client) => {
        interaction.reply({
            content: "🥍 Gecikme: " + client.ws.ping + "ms"
        });
    }
}
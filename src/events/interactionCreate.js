import * as Discord from 'discord.js';
import { InteractionType } from 'discord.js';
import config from "../../config.json" assert {type: 'json'};

export default {
    name: "interactionCreate",
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Interaction} interaction 
     * @returns 
     */
    run: async(client, interaction) => {
        if(interaction.type == InteractionType.ApplicationCommand) {
            let cmd = client.commands.get(interaction.commandName);
            if(cmd == null) return;
            try {
                cmd.run(interaction, client);
            } catch(err) {
                interaction.reply("There was an unexpected error!")
            }
        }
    }
}
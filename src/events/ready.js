import { Client } from 'discord.js';
import mongoose from 'mongoose';
import { loadCommands } from '../handlers/command.js';
import { loadModules } from '../handlers/module.js';
import config from "./../../config.json" assert {type: 'json'};

export default {
    name: "ready",
    /**
     * 
     * @param {Client} client 
     */
    run: async(client) => {
        if(config.mongo_uri == null || config.mongo_uri == undefined || config.mongo_uri == "") return console.log("MongoURI is not set config > mongo_uri");
        await mongoose.connect(config.mongo_uri, {
            keepAlive: true
        }).then(() => {
            console.log("[Veritabanı] MongoDB bağlantısı kuruldu");
        }).catch((err) => {
            throw err;
        })
        await loadModules();
        await loadCommands();
        console.log("[Bot] " + client.user.tag + " Aktif!")

    }
}
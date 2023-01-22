import { Client } from 'discord.js';
import fs from 'fs';
import client from '../../index.js';
/**
 * 
 * @param {Client} client 
 */
export async function loadModules() {
    const moduleDirectories = fs.readdirSync('./modules/');
    await Promise.all(moduleDirectories.map(async(module) => {
        console.log("[Modül] Yükleniyor: " + module);
        const moduleFiles = fs.readdirSync('./modules/' + module);
        if(!moduleFiles.includes('module.json')) {
            console.log("[Modül] " + module + " yüklenemedi! module.json dosyası bulunmuyor.");
        } else {
            const moduleP = (await import('../../modules/' + module + "/module.json", 
                { 
                    assert: { 
                        type: 'json' 
                    } 
                }
            )).default;
            if(moduleP.enabled) {
                const { onEnable } = (await import('../../modules/' + module + "/" + moduleP.main));
                onEnable(client);
                console.log("[Modül] " + module + " yüklendi.")
            } else {
                console.log("[Modül] " + module + " deaktif.")
            }
        }
    }))
}

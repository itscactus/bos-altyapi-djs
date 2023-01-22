import fs from 'fs'; 
export default async function loadEvents(client) {
    for(const event of fs.readdirSync('./src/events').filter(file => file.endsWith('.js'))) {
        const eventP = (await import('../events/' + event)).default;
        if(eventP?.once) {
            client.once(eventP.name, eventP.run.bind(null, client));
            console.log("[Event] " + event + " yüklendi! Kullanılan event: " + eventP.name + " (once)")
        } else {
            client.on(eventP.name, eventP.run.bind(null, client));
            console.log("[Event] " + event + " yüklendi! Kullanılan event: " + eventP.name + " (on)")
        }
    }
}
/*
------------------------------------------------------
  -  __   __     ______     __         ______   __    
  - /\ "-.\ \   /\  __ \   /\ \       /\  ___\ /\ \   
  - \ \ \-.  \  \ \ \/\ \  \ \ \____  \ \  __\ \ \ \  
  -  \ \_\\"\_\  \ \_____\  \ \_____\  \ \_\    \ \_\ 
  -   \/_/ \/_/   \/_____/   \/_____/   \/_/     \/_/ 
------------------------------------------------------
*/
const config = require("./config.json")
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const fs = require('fs');
client.commands = new Discord.Collection();

const prefix = config.prefix
const version = '1.1.0'

fs.readdir("./commands/", (err, files) => {
    let jsfile = files.filter(f => f.split(".").pop() === "js")

    if (err) console.log(err);
    if (jsfile.length <= 0) {
        console.log("Can't find commands.");
        return;
    } jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`Loaded ${f}`);
        client.commands.set(props.help.name, props);
    });
});

const eventFiles = fs.readdirSync("./events/")
eventFiles.forEach(file => {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
  console.log(`Loaded ${file}`);
});

client.on("message", async (message, member) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(client, message, args);
})

client.login(config.token);
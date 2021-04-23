/*
------------------------------------------------------
  -  __   __     ______     __         ______   __    
  - /\ "-.\ \   /\  __ \   /\ \       /\  ___\ /\ \   
  - \ \ \-.  \  \ \ \/\ \  \ \ \____  \ \  __\ \ \ \  
  -  \ \_\\"\_\  \ \_____\  \ \_____\  \ \_\    \ \_\ 
  -   \/_/ \/_/   \/_____/   \/_____/   \/_/     \/_/ 
------------------------------------------------------
*/
const Discord = require("discord.js");
const config = require("../config.json")

module.exports.run = async (client, message, args) => {
    message.delete();
    let embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(`**Bot Commands** \n**${config.prefix}ban <User_id> <Reason> - __Ban a player__** \n**${config.prefix}unban <User_id> - __Unban a player__** \n**${config.prefix}unbanall - __UnBan all players on the server__** \n**${config.prefix}whitelist <User_id> - __Whitelist a player__** \n**${config.prefix}unwhitelist <User_id> - __UnWhitelist a player__** \n**${config.prefix}whitelistall - __Whitelist all players on the server__**`)
    .setTimestamp();
    message.channel.send(embed)
}

module.exports.help = {
    name: "help"
}
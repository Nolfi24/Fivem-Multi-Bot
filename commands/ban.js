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
const mysql = require("mysql2");
const con = mysql.createConnection({
  host: config.dbHost,
  user: config.dbUser,
  database: config.dbName,
})
con.connect(function(err) {
    if (err) throw err;
    console.log("MySQL Connected!")
});

function banplayer(id, reason) {
  var sql = `UPDATE vrp_users SET banned = '1' WHERE id = '${id}'`;
  con.query(sql, function (result){
  if (result) { console.log(result) }
});
}

module.exports.run = async (client, message, args) => {
    message.delete();
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Invalid permissions.").then(msg => msg.delete(10000));
    if(args[0] == undefined) return message.channel.send("Skriv venligst spillerens id.");
    if(args[1] == undefined) return message.channel.send("Skriv venligst en grund til dit ban.");
    let reason = args.slice(1).join(" ");
    const user_id = args[0]
    banplayer(user_id, reason)

    let embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`**User:** <@${message.author.id}> \n**Banned ID:** ${user_id} \n**Reason:** ${reason}`)
    .setTimestamp()
    .setFooter("Made By Nolfi");
    message.channel.send(embed)
}

module.exports.help = {
    name: "ban"
}
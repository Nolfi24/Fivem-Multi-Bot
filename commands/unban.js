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

function unbanplayer(id) {
  var sql = `UPDATE vrp_users SET banned = '0' WHERE id = '${id}'`;
  con.query(sql, function (result){
  if (result) { console.log(result) }
});
}

module.exports.run = async (client, message, args) => {
    message.delete();
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Invalid permissions.").then(msg => msg.delete(10000));
    if(args[0] == undefined) return message.channel.send("Skriv venligst spillerens id.");
    const user_id = args[0]
    unbanplayer(user_id)

    let embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setDescription(`**User:** <@${message.author.id}>\n**UnBanned ID:** ${user_id}`)
    .setTimestamp();
    message.channel.send(embed)
}

module.exports.help = {
    name: "unban"
}
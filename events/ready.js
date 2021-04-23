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
const fivereborn = require("fivereborn-query")
const config = require ("../config.json")

module.exports = (client, message, args) => {

    console.log(`Logged in as ${client.user.tag}`)
    console.log(`Im on ${client.guilds.cache.size} Server(s)`)
    console.log(`My Prefix is "${config.prefix}"`)
    console.log("Copyright 2020-2021 ©Nolfi. All rights reserved");

    function activity(){
        setTimeout(() => {
            fivereborn.query(`${config.ip}`,`${config.port}`, (err, data) => {
                if (err) {
                    client.user.setActivity(`Serveren er midlertidigt nede!`, { type: "PLAYING" });
                    console.log("Server Is Offline");
                } else {
                    client.user.setActivity(`${data.clients}/${data.maxclients} i byen`, { type: "WATCHING" });
                }
            });
            activity();
        }, 1000);
    }
    activity();
};
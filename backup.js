const Discord = require('discord.js');
const clearModule = require('clear-module');
const uncached = require('require-uncached');
const config = require('./conf.json');
const jsonfile = require('jsonfile');
const fs = require('fs');
const util = require('util');
const replace = require('replace');
let data = uncached('./data.json');
let file = fs.readFile('./info.json', (error, data) => {
  file = toString(file);
  console.log("file: " + file);
});
const client = new Discord.Client();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

client.login(config.token);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`people use $help for info`, {type: `WATCHING`})
});
let clearing = false;
client.on('message', msg => {
  let ServerID = msg.guild.id;
  
  if(msg.author.bot) return;
  
  data = uncached("./data.json");
  let indexVerify =JSON.stringify(data).indexOf(ServerID);
  if(indexVerify == null){
    let dataStringify = JSON.stringify(data);
    let pushServer = JSON.parse(dataStringify);
    pushServer.push(JSON.parse(`{"${ServerID}":[{"currencyName()":""}]}`));
    fs.writeFile(`./data.json`, JSON.stringify(pushServer));
    msg.channel.send(`Added this server to currency database.\n ` +
    `Use "$setcurrencyName() [currencyName()]" without quotes and without "[]" to set a custom currency name`);
  }
  
  let currencyName = ()=>{
    if(JSON.stringify(data).indexOf(ServerID + ":[{currencyName()") == -1) 
      return "credits";
    else if(JSON.stringify(data).indexOf(ServerID + ":[{currencyName()") != -1)
      return data[ServerID].currencyName();
  }
  
  //else if (msg.content.tts == true) return;
    if (msg.content.startsWith(`$info`)) {
        msg.reply(`\nI'm a Multipurpose BOT designed and programmed by DiljitSandhu and someCoder747, just for handling serever and for timepassing \:yum: \n` +
        `Website: http://thecomiccrafters.freeasphost.net/thecomiccrafters.html\n` +
        `Forums: http://thecomiccrafters.forumotion.com/f2-general-talk\n` +
        `My home: https://discord.gg/UjzaH94`);
    }
    if (msg.content.startsWith(`$help`)) {
        msg.reply(`\n$kick @userhere to kick a user\n` +
        `$info for info on this bot \n` +
        `$help for this help message\n` +
        `$${currencyName()} to check how many ${currencyName()} you have\n` +
        `$setcurrencyName() [currencyName()]: Set a custom currency name`);
    }
    
    let usera = msg.mentions.members.first();
    let msgSender = msg.member;
    if (usera != ""){
    if (msg.content.startsWith(`$kick`)) {
      if (msg.member.roles.some(r=>[`BOT developers`, `ADMINISTATOR`, `STAFF`, `ADMINISTRATOR`].includes(r.name)) 
          && !usera.roles.some(r=>[`BOT developers`, `ADMINISTATOR`, `STAFF`, `ADMINISTRATOR`].includes(r.name))){
      let member = msg.mentions.members.first();
      member.kick(`Kicked`)
      .catch(error => {
        msg.reply(`I couldn't kick ${msgSender} because of: ${error}`);
        console.log(`Bad perms`);
      }).then(() => {
      console.log(`Kicked ${member}`);
      msg.reply(`${member} has been kicked for violating the rules`);
      });
      }
      else{
        msg.reply(` you don't have permission to use this command...`);
        console.log(`${msgSender} tried to kick but failed`)
      }
    }
}

    
    
    if (usera != ""){
    if (msg.content.startsWith(`$ban`)) {
      if (msg.member.roles.some(r=>[`BOT developers`, `ADMINISTATOR`, `STAFF`, `ADMINISTRATOR`].includes(r.name)) 
          && !usera.roles.some(r=>[`BOT developers`, `ADMINISTATOR`, `STAFF`, `ADMINISTRATOR`].includes(r.name))){
      let member = msg.mentions.members.first();
      member.ban(`Banned`)
      .catch(error => {
        msg.reply(`I couldn't ban ${msgSender} because of: ${error}`);
        console.log(`Bad perms`);
      }).then(() => {
      console.log(`Banned ${member}`);
      msg.reply(`${member} has been banned for violating the rules`);
      });
      }
      else{
        msg.reply(` you don't have permission to use this command...`);
        console.log(`${msgSender} tried to ban but failed`)
      }
    }
    }
    
    
    
    if (msg.content.startsWith(`$${currencyName()}`)) {
      data = uncached('./data.json');
      let member = msg.author.id;
      let guildID = msg.guild.id;
      let found = false;
      let indexStart = JSON.stringify(util.inspect(data[ServerID], {depth: null, compact: false})).indexOf(member);
      if (indexStart != -1 && !isNaN(indexStart)){
        let valGet = JSON.stringify(data).indexOf(`}`, indexStart);
        let getJSON = `{"${JSON.stringify(data).substring(indexStart, valGet)}}`;
        getJSON = getJSON.replace("NaN", "0");
        let amount = JSON.parse(getJSON);
        console.log("amount" + amount);
        console.log(`Member: ${member} \nindexStart: ${indexStart} \nvalGet: ${valGet} \ngetJSON: ${getJSON} \namount: ${amount}`);
        if (parseInt(amount) == 0){
          msg.reply(`\nYou have no ${currencyName()}.\n` +
          `Be an active member to get more`);
          found = true;
        }
        else if (parseInt(amount) == 1){
          msg.reply(`\nYou have ${amount} credit.\n` +
          `Be an active member to get more`);
          found = true;
        }
        else if (parseInt(amount) > 1){
          msg.reply(`\nYou have ${amount} ${currencyName()}.\n` +
          `Be an active member to get more`);
          found = true;
        }
        else {
          msg.reply(` Oops, I dun goofed! Contact the dev, someCoder747`)
        }
      }
      else if (indexStart == -1){
        msg.reply(`\nYou have no ${currencyName()}.\nBe an active member to get more`);
      }
    }
    
    
    
    if (usera != ""){
      file = fs.readFile('./info.json', (error, data) => {
        file = toString(file);
        console.log("file: " + file);
      });
      
    if (msg.content.startsWith(`$give${currencyName()}`)) {
      if (msg.mentions.members.first() == "<@445910423288414218>"){
        msg.reply(" don't give me ${currencyName()}. I can't use it/them")
      }
      else if (msg.member.roles.some(r=>[`BOT developers`, `ADMINISTATOR`, `ADMINISTRATOR`].includes(r.name))){
        //data = uncached('./data.json');
        let member = msg.mentions.members.first();
        member = member.id;
        console.log("member: " + member);
        let guildID = msg.guild.id;
        console.log(`guildID: ${guildID}`)
        console.log(util.inspect(data[ServerID], {depth: null, compact: false}));
        let cleanMsg = msg.content.replace(msg.mentions.members.first(), ``);
        let setAmount = function(){
          if(isNaN(cleanMsg.match(/\d+/)) || cleanMsg.match(/\d+/) == null){
            return 1;
          }
          else{
            return cleanMsg.match(/\d+/)[0];
          }
        }
        data = JSON.parse(file);
        console.log("setAmount: " + setAmount());
        console.log(`JSON.stringify(data[ServerID]): ${JSON.stringify(util.inspect(data[ServerID], {depth: null, compact: false}))}`);
        let indexStart = JSON.stringify(data).indexOf(ServerID);
        let valGet = JSON.stringify(data).indexOf(`]`, indexStart);
          console.log(`Member: ${member} \nindexStart: ${indexStart} \nvalGet: ${valGet} \n`);
        if (indexStart == -1){
          let newUser = JSON.stringify(util.inspect(data[ServerID], {depth: null, compact: false}));
          let pushUser = JSON.parse(newUser);
          console.log(newUser);
          console.log(pushUser);
          pushUser.push(JSON.parse(`{"${member}":"${setAmount()}"}`));
          let pushData = data;
          pushData[ServerID] = pushUser;
          fs.writeFile(`./data.json`, JSON.stringify(pushData));
          msg.reply(`\n Gave ${msg.mentions.members.first()} ${setAmount()} ${currencyName()}!`);
        }
        else {
          let getJSON = `{"${JSON.stringify(data).substring(indexStart, valGet)}}`;
          getJSON = getJSON.replace("NaN", "0");
          let amount = JSON.parse(getJSON);
          console.log(`Member: ${member} \nindexStart: ${indexStart} \nvalGet: ${valGet} \ngetJSON: ${getJSON}`);
          let checkNaN = function(){
            if (isNaN(amount)){
              return 0;
            }
            else{
              return amount;
            }
          }
          let setVal = parseInt(amount)+parseInt(setAmount());
          console.log("setVal: " + setVal);
          let setData = data;
          setData[ServerID][member] = setVal;
          fs.writeFile(`./data.json`, JSON.stringify(setData));
          
          if (setAmount() != 1){
            msg.reply(`\n Gave ${msg.mentions.members.first()} ${setAmount()} ${currencyName()}!`);
          }
          else{
            msg.reply(`\n Gave ${msg.mentions.members.first()} ${setAmount()} ${currencyName()}!`);
          }
        }
      }
      else{
        msg.reply(` you don't have permission to use this command...`);
        let member = msg.mentions.members.first();
        member = member.id;
        console.log(`${member} tried to give ${currencyName()} but failed...`);
      }
    }
    }
    
    
    
    if (usera != ""){
    if (msg.content.startsWith(`$remove${currencyName()}`)) {
      if (msg.mentions.members.first() == "<@445910423288414218>"){
        msg.channel.send("nopls i need to feed my family")
      }
      else if (msg.member.roles.some(r=>[`BOT developers`, `ADMINISTATOR`, `ADMINISTRATOR`].includes(r.name))){
        data = uncached('./data.json');
        let member = msg.mentions.members.first();
        member = member.id;
        console.log("membr: " + member);
        let guildID = msg.guild.id;
        console.log(util.inspect(data[ServerID], {depth: null, compact: false}));
        let cleanMsg = msg.content.replace(msg.mentions.members.first(), ``);
        let setAmount = function(){
          if(isNaN(cleanMsg.match(/\d+/)) || cleanMsg.match(/\d+/) == null){
            return 1;
          }
          else{
            return cleanMsg.match(/\d+/)[0];
          }
        }
        console.log("setAmount: " + setAmount());
        let found = false;
        let indexStart = JSON.stringify(util.inspect(data[ServerID], {depth: null, compact: false})).indexOf(member);
        let valGet = JSON.stringify(util.inspect(data[ServerID], {depth: null, compact: false})).indexOf(`}`, indexStart);
          console.log(`Member: ${member} \nindexStart: ${indexStart} \nvalGet: ${valGet} \n`);
        if (indexStart == -1){
          msg.reply(`${member} has insufficent ${currencyName()}`);
          console.log(msg.author.id + " tried to remove credits but failed");
        }
        else {
          let getJSON = `{"${JSON.stringify(util.inspect(data[ServerID], {depth: null, compact: false})).substring(indexStart, valGet)}}`;
          getJSON = getJSON.replace("NaN", "0");
          let amount = JSON.parse(getJSON)[ServerID][member];
          console.log(`Member: ${member} \nindexStart: ${indexStart} \nvalGet: ${valGet} \ngetJSON: ${getJSON}`);
          let checkNaN = function(){
            if (isNaN(amount)){
              return 0;
            }
            else{
              return amount;
            }
          }
          let setVal = parseInt(amount) - (parseInt(setAmount()));
          console.log(`setVal: ${setVal}`)
          if (setVal >= 0){
            console.log("setVal: " + setVal);
          let setVal = parseInt(amount)+parseInt(setAmount());
          console.log("setVal: " + setVal);
          let setData = data;
          setData[ServerID][member] = setVal;
          fs.writeFile(`./data.json`, JSON.stringify(setData));
          
            if (setAmount() != 1){
              msg.reply(`\n Took ${setAmount()} ${currencyName()} from ${msg.mentions.members.first()}`);
            }
            else{
              msg.reply(`\n Took ${setAmount()} ${currencyName()} from ${msg.mentions.members.first()}`);
            }
          }
          else {
            msg.channel.send(msg.mentions.members.first() + ` has insufficent ${currencyName()}\nIf you want to remove all of them, try removing ` + amount);
            console.log(msg.author.id + " tried to remove credits but failed");
          }
        }
      }
      else{
        msg.reply(` you don't have permission to use this command...`);
        let member = msg.mentions.members.first();
        member = member.id;
        console.log(msg.author.id + " tried to remove credits but failed");
      }
    }
    }
});
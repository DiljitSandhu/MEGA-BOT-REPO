
const Discord = require('discord.js');
const config = require('./conf.json');
const client = new Discord.Client();
const jsonfile = require('jsonfile');
const uncached = require('require-uncached');
const fs = require('fs');
const replace = require('replace');
let data = uncached('./data.json');
const file = './data.json';

const {Client, Collection, RichEmbed} = require("discord.js");
const iCanvas = require("discord.js");
const sneckfetch = require("discord.js");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

client.login(config.token);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.user.setActivity(`Playing PokeOne | User $help! | Writing myself `)
let clearing = false;
client.on('message', msg => {
  if(msg.channel.type == "dm")
	 console.log(msg.content);
  if(msg.author.bot) return;
  
 
  //else if (msg.content.tts == true) return;

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
    
    
    
    if (msg.content.startsWith(`$credits`)) {
      data = uncached('./data.json');
      let member = msg.author.id;
      let guildID = msg.guild.id;
      let found = false;
      let indexStart = JSON.stringify(data).indexOf(member);
      if (indexStart != -1 && !isNaN(indexStart)){
        let valGet = JSON.stringify(data).indexOf(`}`, indexStart);
        let getJSON = `{"${JSON.stringify(data).substring(indexStart, valGet)}}`;
        getJSON = getJSON.replace("NaN", "0");
        let amount = JSON.parse(getJSON)[member];
        console.log("amount" + amount);
        console.log(`Member: ${member} \nindexStart: ${indexStart} \nvalGet: ${valGet} \ngetJSON: ${getJSON} \namount: ${amount}`);
        if (parseInt(amount) == 0){
          msg.reply(`\nYou have no credits.\n` +
          `Be an active member to get more`);
          found = true;
        }
        else if (parseInt(amount) == 1){
          msg.reply(`\nYou have ${amount} credit.\n` +
          `Be an active member to get more`);
          found = true;
        }
        else if (parseInt(amount) > 1){
          msg.reply(`\nYou have ${amount} credits.\n` +
          `Be an active member to get more`);
          found = true;
        }
        else {
          msg.reply(` Oops, I dun goofed! Contact the dev, DiljitSandhu`)
        }
      }
      else if (indexStart == -1){
        msg.reply(`\nYou have no credits.\nBe an active member to get more`);
      }
    }
    
    
    
    if (usera != ""){
    if (msg.content.startsWith(`$givecredits`)) {
      if (msg.mentions.members.first() == "<@445910423288414218>"){
        msg.reply(" don't give me credits. I can't use them")
      }
      else if (msg.member.roles.some(r=>[`BOT developers`, `ADMINISTATOR`, `ADMINISTRATOR`].includes(r.name))){
        data = uncached('./data.json');
        let member = msg.mentions.members.first();
        member = member.id;
        console.log("member: " + member);
        let guildID = msg.guild.id;
        console.log(data);
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
        let indexStart = JSON.stringify(data).indexOf(member);
        let valGet = JSON.stringify(data).indexOf(`}`, indexStart);
          console.log(`Member: ${member} \nindexStart: ${indexStart} \nvalGet: ${valGet} \n`);
        if (indexStart == -1){
          let newUser = JSON.stringify(data);
          let pushUser = JSON.parse(newUser);
          console.log(newUser);
          console.log(pushUser);
          pushUser.push(JSON.parse(`{"${member}":"${setAmount()}"}`));
          fs.writeFile(`./data.json`, JSON.stringify(pushUser));
          msg.reply(`\n Gave ${msg.mentions.members.first()} ${setAmount()} credits!`);
        }
        else {
          let getJSON = `{"${JSON.stringify(data).substring(indexStart, valGet)}}`;
          getJSON = getJSON.replace("NaN", "0");
          let amount = JSON.parse(getJSON)[member];
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
          replace({
            regex: `{"${member}":"${amount}"}`,
            replacement: `{"${member}":"${setVal}"}`,
            paths: ['./data.json'],
            recursive: true,
            silent: true,
          });
          if (setAmount() != 1){
            msg.reply(`\n Gave ${msg.mentions.members.first()} ${setAmount()} credits!`);
          }
          else{
            msg.reply(`\n Gave ${msg.mentions.members.first()} ${setAmount()} credit!`);
          }
        }
      }
      else{
        msg.reply(` you don't have permission to use this command...`);
        let member = msg.mentions.members.first();
        member = member.id;
        console.log(`${member} tried to give credits but failed...`);
      }
    }
    }
    
    
    
    if (usera != ""){
    if (msg.content.startsWith(`$removecredits`)) {
      if (msg.mentions.members.first() == "<@445910423288414218>"){
        msg.channel.send("nopls i need to feed my family")
      }
      else if (msg.member.roles.some(r=>[`BOT developers`, `ADMINISTATOR`, `ADMINISTRATOR`].includes(r.name))){
        data = uncached('./data.json');
        let member = msg.mentions.members.first();
        member = member.id;
        console.log("member: " + member);
        let guildID = msg.guild.id;
        console.log(data);
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
        let indexStart = JSON.stringify(data).indexOf(member);
        let valGet = JSON.stringify(data).indexOf(`}`, indexStart);
          console.log(`Member: ${member} \nindexStart: ${indexStart} \nvalGet: ${valGet} \n`);
        if (indexStart == -1){
          msg.reply(member + " has insufficent credits");
          console.log(msg.author.id + " tried to remove credits but failed");
        }
        else {
          let getJSON = `{"${JSON.stringify(data).substring(indexStart, valGet)}}`;
          getJSON = getJSON.replace("NaN", "0");
          let amount = JSON.parse(getJSON)[member];
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
            replace({
              regex: `{"${member}":"${amount}"}`,
              replacement: `{"${member}":"${setVal}"}`,
              paths: ['./data.json'],
              recursive: true,
              silent: true,
            });
            if (setAmount() != 1){
              msg.reply(`\n Took ${setAmount()} credits from ${msg.mentions.members.first()}`);
            }
            else{
              msg.reply(`\n Took ${setAmount()} credit from ${msg.mentions.members.first()}`);
            }
          }
          else {
            msg.channel.send(msg.mentions.members.first() + " has insufficent credits\nIf you want to remove all of them, try removing " + amount);
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
    else if (usera == ""){
      msg.reply(" user isn't specified");
      console.log("user isn't specified");
    }
    
    if (msg.content.toLowerCase().startsWith(`easy`)) {
            msg.reply (`\nI can't belive it's that **EASY**!! >_<`)
        }
        if (msg.content.toLowerCase().startsWith(`hard`)) {
            msg.reply ( `\nOOF, i don't think thats hard -_- `)
        }
        if (msg.content.toLowerCase().startsWith(`$devs`)) {
            msg.reply ( `\nI have two programmers: Diljitsandhu and SomeCoder747 \:yum:`)
        }
        if (msg.content.toLowerCase().startsWith(`hi bot`)) {
            msg.reply (`\nHi! Wanna talk?`)    
        }    
        if (msg.content.toLowerCase().startsWith(`favorite colour`)) {
            msg.reply (`\nMine's red!`)    
        }
        if (msg.content.toLowerCase().startsWith(`favorite pokemon`)) {
            msg.channelannel.send(replyEmbed).then(msg => {msg.delete(5000)});   
        }
        if (msg.content.toLowerCase().startsWith(`$supportserver`)) {
            msg.reply (`\nMy home: https://discord.gg/UjzaH94 <<<- It is my **HOME LOVELY HOME** !`)    
        } 

         module.exports.run = async (bot, message, args) => {

  //!addrole @andrew Dog Person
    if (!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "MANAGE_ROLES");
    if (args[0] == "$addrolehelp") {
      msg.reply("Usage: $addrole <user> <role>");
      return;
    }
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!rMember) return errors.cantfindUser(message.channel);
    let role = args.join(" ").slice(22);
    if (!role) return message.reply("Specify a role!");
    let gRole = message.guild.roles.find(`name`, role);
    if (!gRole) return message.reply("Couldn't find that role.");

    if (rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
     await (rMember.addRole(gRole.id));

     try {
      await rMember.send(`Congrats, you have been given the role ${gRole.name}`)
     } catch (e) {
      console.log(e.stack);
      message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked.`)
     }
     }

   module.exports.help = {
    name: "$addrole"
    }
	
	 
	 
    	let cmds = new Discord.RichEmbed()
  .setAuthor(client.user.username,client.user.avatarURL)
  .setColor(0x66CC00)
  .setDescription("***Commands*** \n\n```BOT```\n-`$info` [to get bot info]\n-`$help` [to get list of commands]\n-`$botinfo` [to get bot's detailed info]\n\n``` Moderation ``` \n\n -`$kick @user` [to kick a member] \n-`$ban @user` [to ban a member] \n\n```Utilities```\n-`$userinfo` [to get your account info]\n-`$serverinfo` [to get server info]\n-`$addr @user (role name)` [it gives the user the role you written]\n-`$procard` [it shows your profile card]\n\n```Squad```\n-`$mysquad` [to get info of your squad]\n-`$sm (squad-name)` [to make a new squad]\n-`$squadsystem` [to get all info about squads]\n-`$stop` [shows squad leaderboard]\n\n```Credits```\n-`$credits` [to check the amount of credits you have]\n-`$givecredits @user (amount)` [it transfer the amount of credits to another user]\n-`$ctop` [it shows leaderboard of credits]\n\n```Leveling```\n-`$myxp` [gives your level info]\n-`$xptop` [shows leaderboard of leveling]")
  .setThumbnail(msg.author.displayAvatarURL)
  .setTimestamp()
  
  		  	     if (msg.content.startsWith(`$help`))
    {
     msg.reply(`\nCheck your DMs!`);
      msg.author.send({ embed: cmds });
    }
	
		let c2 = new Discord.RichEmbed()
  .setAuthor(client.user.username,client.user.avatarURL)
  .setColor(0x66CC00)
  .setDescription("I'm a Multipurpose BOT designed by DiljitSandhu and programmed by both diljitsandhu and someCoder747 for server managememt and for timepassing \:yum: type $help for list of commands")
  .setThumbnail(msg.author.displayAvatarURL)
  .setTimestamp()
  
  		  	     if (msg.content.startsWith(`$info`))
    { 
      msg.reply()
      msg.channel.send({embed: cyd});
      msg.author.send({ embed: c2 });
    }
	
			let c3 = new Discord.RichEmbed()
  .setAuthor(client.user.username,client.user.avatarURL)
  .setColor(3447003)
  .setDescription()
  .setThumbnail(msg.author.displayAvatarURL)
  .setTimestamp()
  
  		  	     if (msg.content.startsWith(`$csystem`))
    {
      msg.channel.send({ embed: c3 });
    }
	
				let c4 = new Discord.RichEmbed()
  .setAuthor(client.user.avatarURL)
  .setColor(3447003)
  .setDescription("\n\n __**~CREDIT SHOP~**__ \n\n" +
  "\n 1> *buy a custom role* \n" +
  "\n 2> *buy a modified role* \n" +
  "\nUSAGE = /open1 *(to open 1st option)*\n\n /open2 *(to open 2nd option)* \n")
  .setThumbnail(msg.author.displayAvatarURL)
  .setTimestamp()
  .setFooter("Requested by" + msg.author.username)
  
  		  	     if (msg.content.startsWith(`$nononohell`))
    {
      msg.channel.send({ embed: c4 });
    }
					let o1 = new Discord.RichEmbed()
  .setAuthor(client.user.username,client.user.avatarURL)
  .setColor(3447003)
  .setDescription("**BUY A CUSTOM ROLE** \n\n USGAGE = $buyrole (rolename) \n\n *IT COSTS 70 CREDITS* ")
  .setThumbnail(msg.author.displayAvatarURL)
  .setTimestamp()
  
  		  	     if (msg.content.startsWith(`/open1`))
    {
      msg.channel.send({ embed: o1 });
    }
	
						let o2 = new Discord.RichEmbed()
  .setAuthor(client.user.username,client.user.avatarURL)
  .setColor(3447003)
  .setDescription("**BUY A MODIFIED ROLE** \n\n USAGE= $buyrole (rolename) (color) \n\n *IT COST 80 CREDITS* ")
  .setThumbnail(msg.author.displayAvatarURL)
  .setTimestamp()
  
  		  	     if (msg.content.startsWith(`/open2`))
    {
      msg.channel.send({ embed: o2 });
    }
	
	
	
				let c5 = new Discord.RichEmbed()
  .setAuthor(client.user.username,client.user.avatarURL)
  .setColor(3447003)
  .setDescription("``` HERE your medals ```\n\n 1> ``` YOU HAVE NO MEDALS ```")
  .setThumbnail(msg.author.displayAvatarURL)
  .setFooter("Requested by " + " " + msg.author.username)
  .setTimestamp()
  
  		  	     if (msg.content.startsWith(`$medals`))
    {
      msg.channel.send({ embed: c5 });
    }
	
				let c6 = new Discord.RichEmbed()
  .setAuthor(client.user.username,client.user.avatarURL)
  .setColor(3447003)
  .setDescription(`Your Client ID is ${msg.author.id}`)
  .setThumbnail(msg.author.displayAvatarURL)
  .setTimestamp()
  
  		  	     if (msg.content.startsWith(`$clientid`))
    {
      msg.channel.send({ embed: c6 });
    } 

   
   				let c8 = new Discord.RichEmbed()
  .setAuthor(client.user.username,client.user.avatarURL)
  .setColor(3447003)
  .setDescription(`***Squads*** \n\n Squads are like guilds . These consist of 120 members MAX . A squad can be made with 200000 credits a squad consist of the following powers - Leader , Co-Leader , Manager , Officer , Member , New Member\n\n Squad wars are held monthly , top 10 squad’s members get 2000 credits each leader gets 3000 credits`)
  .setThumbnail(msg.author.displayAvatarURL)
  .setFooter("Requested by " + " " + msg.author.username)
  .setTimestamp()
  
  		  	     if (msg.content.startsWith(`$squadsystem`))
    {
      msg.channel.send({ embed: c8 });
    }
	           let invite = new Discord.RichEmbed()
	.setDescription("https://discordapp.com/api/oauth2/authorize?client_id=%445910423288414218&permissions=8&scope=bot");
	   
	            if (msg.content.startsWith(`$invite`))
				{
                              msg.channel.send({embed: cyd});
				msg.author.send( {embed: invite} );
				}
	
              let tm = new Discord.RichEmbed()
	.setDescription(msg.author.username);
	if (msg.content.startsWith(`$totalmembers`))
	{
		msg.channel.send({embed: tm } );
	}
	
	      				let wlcm = new Discord.RichEmbed()
  .setColor(3447003)
  .setDescription("Hola **${msg.member.mention.first}**! Welcome to **${guild.name}**\n We currently have ***${guild.memberCount}***!")
  .setThumbnail(msg.author.displayAvatarURL)
  .setFooter("Welcome to " + " " + msg.author.username)
  .setTimestamp() 
  
               let c16 = new Discord.RichEmbed()
  .setAuthor(client.user.username,client.user.avatarURL)
  .setColor(3447003)
  .setDescription("For this bot's admin features, you will need: \n" +
                  "-All users of Admin commands require the \"ADMINISTRATOR\" role exactly as spelled without quotes, \n" + 
                  "-and for this bot to have administrator privileges in server settings")
  .setThumbnail(msg.author.displayAvatarURL)
  .setFooter("Requested by " + " " + msg.author.username)
  .setTimestamp()

              if (msg.content.startsWith('$botsetup')){
      msg.channel.send({ embed: c16 });
    } 


    let c14 = new Discord.RichEmbed()
    .setAuthor(client.user.username,client.user.avatarURL)
    .setColor(3447003)
    .setDescription("The API that this bot was made with: \n\nhttps://discord.js.org/#/")
    .setURL("https://discord.js.org/#/")
    .setThumbnail(msg.author.displayAvatarURL)
    .setFooter("Requested by " + " " + msg.author.username)
    .setTimestamp();


    if (msg.content.startsWith("$makeabot")){
	msg.channel.send({embed: c14 });
    }
  

     
 let userinfoem = new Discord.RichEmbed()
    .setAuthor(client.user.username,client.user.avatarURL)
    .setColor(3447003)
    .setDescription(`${msg.author.username} ‘s INFO \n\n Created At - ${msg.author.createdAt}
Joined At - ${msg.author.joinedAt}
Client ID - ${msg.author.id}
Status - ${msg.author.presence.status}`)
    .setThumbnail(msg.author.displayAvatarURL)

     let member = msg.mentions.members.first(); 

if(msg.content.startsWith(`$userinfo`))
{
   msg.channel.send({embed: userinfoem});
}
   
   let ps = "";
   let sqslice = msg.content.slice(4);
   
    
     let squadm = new Discord.RichEmbed()
    .setAuthor(client.user.username,client.user.avatarURL)
    .setColor(3447003)
    .setDescription(`Squad - ${msg.content.slice(4)}
Leader - ${msg.author.username}
200000 credits deducted 
Added Squad to user profile`)
    .setThumbnail(msg.author.displayAvatarURL)
        
         if(msg.content.startsWith(`$sm`))
 {
          msg.channel.send({embed: squadm});
          console.log(`New Squad Made by ${msg.author.username}`);
 }
    
	    let rank = "";
	
    let akka = "";
	let abot = "";
     
         let proc = new Discord.RichEmbed()
    .setAuthor(client.user.username,client.user.avatarURL)
    .setColor(3447003)
    .setDescription(`Profile Card For ${msg.author.username}
AKA - ${akka}
About - ${abot}
**Credits**
Credits - 
**Level**
Level - 
XP - 
Rank -
**Squad**
Squad - ${ps}`)
    
    .setThumbnail(msg.author.displayAvatarURL)

      if(msg.content.startsWith(`$procard`))
  {     
     
        msg.channel.send({embed: proc});
  }
         let cyd = new Discord.RichEmbed()
    .setAuthor(client.user.username,client.user.avatarURL)
    .setColor(3447003)
    .setDescription(`Check Your DMs!`)
    .setThumbnail(msg.author.displayAvatarURL)

     	    let binfo = new Discord.RichEmbed()
    .setAuthor(client.user.username,client.user.avatarURL)
    .setColor(3447003)
    .setDescription(`***MEGA***\n\nBOT-ID = ${client.user.id}\nBOT-Tag = ${client.user.tag}\nBOT-Owner = DiljitSandhu\nBOT-Programmers = DiljitSandhu , someCoder747\nBOT-Host = RaspberryPI (RPI)\nCreated At = ${client.user.createrAt}\nNO. of Servers = ${client.guilds.size}\nBOT-Language = discord.js`)
    .setURL()
    .setThumbnail(client.user.displayAvatarURL)
    .setFooter("Requested by " + " " + msg.author.username)
    .setTimestamp();


    if (msg.content.startsWith("$botinfo")){
	msg.reply(`\nCheck your DMs!`);
	msg.author.send({embed: binfo });
    }
	
         let serverinfo = new Discord.RichEmbed()
    .setAuthor(msg.guild.name)
    .setColor(3447003)
    .setDescription(`**${msg.guild.name}'s Info**\n\nID - ${msg.guild.id}\nCreated At - ${msg.guild.createdAt}\nMember Count - ${msg.guild.memberCount}\nOwner - ${msg.guild.owner.tag}`)
    .setThumbnail(msg.guild.displayIconURL)
	.setFooter(`${msg.guild.ownerId} | ${msg.guild.name}'s Info | Requested By ${msg.author.username}`)
	
    if(msg.content.startsWith(`$serverinfo`))
	{  
        msg.channel.send({embed: cyd});
		msg.author.send({embed: serverinfo});
	}
      
	  
    if(msg.author.id = `422957901716652033`)
	{
		if(msg.content.startsWith(`$close`))
		{
			msg.channel.send(`closing.....`)
			process.exit();
			msg.edit(`Done . i restarted`)
			client.login(config.token);
		}
	}
	
});

var Discord = require("discord.js");
var prefix = "k!";
var client = new Discord.Client();

client.on("ready", () => {
  console.log("bot online");
});

const ms = require("ms");

const HelpEmbed = new Discord.MessageEmbed()
	.setColor('#667dff')
	.setTitle('KoreNime')
	.setURL('https://korenime.org')
	.setAuthor('Korenimedesu Official', 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/55949885_538923719964479_3109324394070016000_o.jpg?_nc_cat=111&_nc_sid=09cbfe&_nc_ohc=31NeMPdJDzgAX-NLziA&_nc_ht=scontent-sin6-1.xx&oh=af65597c16e3f45eedab0069e9499782&oe=5F5BE3AF', 'https://discord.gg/QgXhHNz')
	.setDescription('Author: @RedEyeGaming2277')
	.addFields(
		{ name: 'Command List', value: 'Korenime Discord Bot Command List' },
		{ name: '\u200B', value: '\u200B' },
	        { name: 'Moderation', value: '**k!mute, k!kick, k!ban, k!purge**', inline: true },
		{ name: 'Fun', value: '**k!avatar**', inline: true },
	)
	.setImage('https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/55949885_538923719964479_3109324394070016000_o.jpg?_nc_cat=111&_nc_sid=09cbfe&_nc_ohc=31NeMPdJDzgAX-NLziA&_nc_ht=scontent-sin6-1.xx&oh=af65597c16e3f45eedab0069e9499782&oe=5F5BE3AF')
	.setTimestamp()
	.setFooter('Korenime', 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/55949885_538923719964479_3109324394070016000_o.jpg?_nc_cat=111&_nc_sid=09cbfe&_nc_ohc=31NeMPdJDzgAX-NLziA&_nc_ht=scontent-sin6-1.xx&oh=af65597c16e3f45eedab0069e9499782&oe=5F5BE3AF');

const {MessageEmbed} = require('discord.js');

var bannedwords = "812581480804".split(",");

client.on("message", msg => {
  if (msg.guild === null) return;

  for (i=0;i<bannedwords.length;i++) {
    if (msg.content.toLowerCase().includes(bannedwords[i])) {
      msg.delete();
      msg.reply("BADWORD");
      return;
    }
  }

  if (msg.author.bot) return;
  if (!msg.member.hasPermission("ADMINISTRATOR")) return;

  if (!msg.content.toLowerCase().startsWith(prefix)) return;
  msg.delete();
  if (msg.content.toLowerCase().startsWith(prefix + "kick ")) {
    var mem = msg.mentions.members.first();
    mem.kick().then(() => {
      msg.channel.send(mem.displayName + " has successfully been kicked by " + msg.author.username + "!");
    }).catch(e => {
      msg.channel.send("An error occured!");
    });
  }
  if (msg.content.toLowerCase().startsWith(prefix + "ban ")) {
    var mem = msg.mentions.members.first();
    var mc = msg.content.split(" ")[2];
    mem.ban(mc).then(() => {
      msg.channel.send(mem.displayName + " has successfully been banned by " + msg.author.username + " for " + mc + " days!");
    }).catch(e => {
      msg.channel.send("An error occured!");
    });
  }
  let args = msg.content.substring(prefix.length).split(" ");

  switch (args[0]) {
    case 'mute':
      var person  = msg.guild.member(msg.mentions.users.first() || msg.guild.members.cache.get(args[1]));
      if(!person) return  msg.reply("I cant find member named " + args[1])
 
      let mainrole = msg.guild.roles.cache.find(role => role.name === "Member");
      let role = msg.guild.roles.cache.find(role => role.name === "mute");
           
 
      if(!role) return msg.reply("Couldn't find the mute role.")
 
 
     let time = args[2];
     if(!time){
       return msg.reply("You didnt specify a time!");
     }
 
     person.roles.add(mainrole)
     person.roles.remove(role);
 
 
     msg.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`)
 
     setTimeout(function(){
                
       person.roles.add(mainrole)
       person.roles.add(role);
       console.log(role)
       msg.channel.send(`@${person.user.tag} has been unmuted.`)
     }, ms(time));
  }
  if (msg.content.toLowerCase().startsWith(prefix + "purge")) {
    var mc = msg.content.split(" ")[1];
    msg.channel.bulkDelete(mc);
  }
  if (msg.content.toLowerCase().startsWith(prefix + "eval")) {
    var sc = msg.content.substring(msg.content.indexOf(" "));
    eval(sc);
  }
  if (msg.content.toLowerCase().startsWith(prefix + "calc")) {
    var ca = msg.content.substring(msg.content.indexOf(" "));
    msg.reply(ca + " is " + eval(ca).toFixed(2));
  }
  if (msg.content.toLowerCase().startsWith(prefix + "help")) {
    msg.channel.send(HelpEmbed);
    return;
  }
	
  if(msg.content.toLowerCase().startsWith(prefix + "avatar")){
    if(msg.mentions.users.size){
       let member=msg.mentions.users.first()
    if(member){
       const emb=new Discord.MessageEmbed().setImage(member.displayAvatarURL()).setTitle(member.username)
       msg.channel.send(emb)
    }else{
      msg.channel.send("Sorry none found with that name")
    }
    }else{
      const emb=new Discord.MessageEmbed().setImage(msg.author.displayAvatarURL()).setTitle(msg.author.username)
      msg.channel.send(emb);
    }
  }
});

client.login("NDQxODg0MDYwMjY5NDEyMzcz.WuwemQ.rCfvZPrmAHR1JsLw30vhOoT5fcw");

var Discord = require("discord.js");
var prefix = "s?";
var client = new Discord.Client();

client.on("ready", () => {
  console.log("bot online");
});

const HelpEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('KoreNime')
	.setURL('https://korenime.org')
	.setAuthor('Korenimedesu Official', 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/55949885_538923719964479_3109324394070016000_o.jpg?_nc_cat=111&_nc_sid=09cbfe&_nc_ohc=31NeMPdJDzgAX-NLziA&_nc_ht=scontent-sin6-1.xx&oh=af65597c16e3f45eedab0069e9499782&oe=5F5BE3AF', 'https://discord.gg/QgXhHNz')
	.setDescription('Author: @RedEyeGaming2277')
	.addFields(
		{ name: 'Command List', value: 'Korenime Discord Bot Command List' },
		{ name: '\u200B', value: '\u200B' },
	        { name: 'Moderation', value: '**s?mute, s?kick, s?ban, s?purge**', inline: true },
		{ name: 'Fun', value: '**s?avatar**', inline: true },
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
  if (msg.content.toLowerCase().startsWith(prefix + "mute")) {
    var mem = msg.mentions.members.first();
    if (msg.guild.roles.chace.find("name", "【Muted】")) {
      mem.addRole(msg.guild.roles.find("name", "Muted")).then(() => {
        msg.channel.send(mem.displayName + " has successfully been muted!");
      }).catch(e => {
        msg.channel.send("An error occured!");
        console.log(e);
      });

    }
  }
  if (msg.content.toLowerCase().startsWith(prefix + "unmute")) {
    var mem = msg.mentions.members.first();
    if (msg.guild.roles.find("name", "Muted")) {
      mem.removeRole(msg.guild.roles.chace.find("name", "【Muted】")).then(() => {
        msg.channel.send(mem.displayName + " has successfully been unmuted!");
      }).catch(e => {
        msg.channel.send("An error occured!");
        console.log(e);
      });

    }
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

client.login("NzEzNDc5MTc5NTc2MDE2OTA3.XsgtRA.04QFLzR3aiHcp_MB7IIH5d08BJ8");
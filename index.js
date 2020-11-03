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
	        { name: 'Moderation', value: 'k!mute, k!kick, k!ban, k!purge', inline: true },
		{ name: 'Fun', value: 'k!avatar, k!kiss, k!hug', inline: true },
	)
	.setImage('https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/55949885_538923719964479_3109324394070016000_o.jpg?_nc_cat=111&_nc_sid=09cbfe&_nc_ohc=31NeMPdJDzgAX-NLziA&_nc_ht=scontent-sin6-1.xx&oh=af65597c16e3f45eedab0069e9499782&oe=5F5BE3AF')
	.setTimestamp()
	.setFooter('Korenime', 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/55949885_538923719964479_3109324394070016000_o.jpg?_nc_cat=111&_nc_sid=09cbfe&_nc_ohc=31NeMPdJDzgAX-NLziA&_nc_ht=scontent-sin6-1.xx&oh=af65597c16e3f45eedab0069e9499782&oe=5F5BE3AF');

const {MessageEmbed} = require('discord.js');

var bannedwords = "812581480804".split(",");

client.on("message", msg => {
  if (msg.guild === null) return;

  if (msg.author.bot) return;
	
  if (!msg.content.toLowerCase().startsWith(prefix)) return;
  msg.delete();
  if(msg.content.toLowerCase().startsWith(prefix + "kiss")){
    var images = ["https://media.tenor.com/images/72a0086bf41c0fa67148139880be9407/tenor.gif", "https://media.tenor.com/images/a57e599cbda46a8f9cf9b2edc3f84dbc/tenor.gif", "https://media.tenor.com/images/a6669f4044d66658c7ce96be768965e4/tenor.gif", "https://media.tenor.com/images/275d46a781ce4fb153a47c09bea28d51/tenor.gif" ];
    var image = Math.floor(Math.random() * images.length);
    if(msg.mentions.users.size){
       let member=msg.mentions.users.first()
    if(member){
      const emb=new Discord.MessageEmbed().setImage(String([images[image]])).setTitle(msg.author.username + " Kissed " + member.username)
      msg.channel.send(emb)
    }else{
      msg.channel.send("Sorry none found with that name")
    }
    }else{
      const emb= new Discord.MessageEmbed().setTitle("Usage:").setDescription("k!kiss [mention]")
      msg.channel.send(emb);
    }
  }
  if(msg.content.toLowerCase().startsWith(prefix + "hug")){
    var images = ["https://media.tenor.com/images/a9bb4d55724484be94d13dd94721a8d9/tenor.gif", "https://media1.tenor.com/images/506aa95bbb0a71351bcaa753eaa2a45c/tenor.gif?itemid=7552075", "https://media1.tenor.com/images/969f0f462e4b7350da543f0231ba94cb/tenor.gif?itemid=14246498", "https://media1.tenor.com/images/4d89d7f963b41a416ec8a55230dab31b/tenor.gif?itemid=5166500" ];
    var image = Math.floor(Math.random() * images.length);
    if(msg.mentions.users.size){
       let member=msg.mentions.users.first()
    if(member){
       const emb=new Discord.MessageEmbed().setImage(String([images[image]])).setTitle(msg.author.username + " Hugs " + member.username)
       msg.channel.send(emb)
    }else{
      msg.channel.send("Sorry none found with that name")
    }
    }else{
      const emb= new Discord.MessageEmbed().setTitle("Usage:").setDescription("k!hug [mention]")
      msg.channel.send(emb);
    }
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
  if (msg.content.toLowerCase().startsWith(prefix + "help")) {
    msg.author.send(HelpEmbed);
    msg.reply("Check your Dm")
    return;
  }
	
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
      let role = msg.guild.roles.cache.find(role => role.name === "Muted");
           
 
      if(!role) return msg.reply("Couldn't find the mute role.")
 
 
     let time = args[2];
     if(!time){
       return msg.reply("You didnt specify a time!");
     }
 
     person.roles.remove(mainrole.id)
     person.roles.add(role.id);
 
 
     msg.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`)
 
     setTimeout(function(){
                
       person.roles.add(mainrole.id)
       person.roles.remove(role.id);
       console.log(role)
       msg.channel.send(`@${person.user.tag} has been unmuted.`)
     }, ms(time));
  }
  if (msg.content.toLowerCase().startsWith(prefix + "purge")) {
    var mc = msg.content.split(" ")[1];
    msg.channel.bulkDelete(mc);
  }
});

client.login(process.env.token);

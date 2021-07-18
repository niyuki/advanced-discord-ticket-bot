const client = require('../../niyuki')
const prefix = client.prefix;
const { Collection, MessageEmbed } = require('discord.js');
const Timeout = new Collection();
const ms = require('ms')
const config = require('../../setting.json')
const blacklist = require('../../models/blacklist')
client.on('message', async message =>{
    if(message.author.bot) return;
            if(!message.content.startsWith(prefix)) return;
            blacklist.findOne({ id : message.author.id }, async(err, data) => {
                if(err) throw err;
      if(!data) {
    if(!message.guild) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        if(!message.member.permissions.has(command.userPermissions || [])) return message.channel.send(await client.translate("You do not have permission to use this command!", message));
        if(!message.guild.me.permissions.has(command.botPermissions || [])) return message.channel.send(await client.translate("I do not have permission to use this command!", message))
        if(command.cooldown) {
            if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(await client.translate(`You are on cooldown of \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` .`),message)
            command.run(client, message, args)
            Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
            setTimeout(() => {
                Timeout.delete(`${command.name}${message.author.id}`)
            }, command.cooldown)
        } else 
            command.run(client, message, args)
            client.channels.cache.get(config.channellist.CommandLog).send(new MessageEmbed()
                .setTitle(`${await client.translate(`Used Command: `, message)} ${command.name}`)
                .setDescription(` ${message.author.tag} ${await client.translate(` user used the command ${command.name}! Command was used in this channel: ${message.channel.name}`,message)}`)
                .setColor('#fff5ee')
                .setFooter('🔥 Niyuki On Fire 🔥'))
    }} else {
        let blacklistalready = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("RED").setTimestamp().setFooter('Niyuki was alone!').addField('You are blacklisted!',`:sob: TO BE REMOVED REACH: <@${config.panel.owner}>`);
        message.channel.send(blacklistalready).then(x => x.delete ({timeout: 10000}))
    }
})
    
});
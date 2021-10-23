const blacklist = require('../../models/blacklist')
const { Message } = require('discord.js')
const Discord = require('discord.js')
const config = require('../../setting.json')

module.exports = {
    name : 'blacklist-remove',
    aliases: ['bl-remove','bl-delete'],
    description : "User Is About To Get Removed From The Blacklist. / Kullaniciyi Blacklistten Kaldirir.",
    run : async(client, message, args) => {
        if(!message.member.roles.cache.get(config.rolelist.ticketauthorized)) return
        const Blacklistuser = message.guild.members.cache.get(args[0])
        let blacklistnotfound = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("RED").setTimestamp().setFooter('This Warning Is Gonna Be Deleted After 10 Seconds!').setDescription(`Herseyi Dogru Girdiginden Emin Misin?`);
        if(!Blacklistuser) return message.channel.send(blacklistnotfound).then(x => x.delete({timeout: 10000}))

        blacklist.findOne({ id : Blacklistuser.user.id }, async(err,data) => {
            if(err) throw err;
            if(data) {
                await blacklist.findOneAndDelete({ id : Blacklistuser.user.id})
                .catch(err => console.log(err))
                let blacklistremoved = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("GREEN").setTimestamp().setFooter('This Warning Is Gonna Be Deleted After 10 Seconds!').setDescription(`**${Blacklistuser.displayName}** has been removed from blacklist. :partying_face:`);
                message.channel.send(blacklistremoved).then(x => x.delete({timeout: 10000}))
            } else {
                let notblacklisted = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("GREEN").setTimestamp().setFooter('This Warning Is Gonna Be Deleted After 10 Seconds!').setDescription(`**${Blacklistuser.displayName}** is not blacklisted. :partying_face:`);
                message.channel.send(notblacklisted).then(x => x.delete({timeout: 10000}))
            }
            
        })
    }
}

const blacklist = require('../../models/blacklist')
const { Message } = require('discord.js')
const Discord = require('discord.js')
const config = require('../../setting.json')
module.exports = { 
    name: 'blacklist',
    aliases: ['niyuki','getrekt', 'bl'],
    description : "User Is About To Get Blacklisted. / Kullaniciyi Blackliste ekler.",
    /**
     * @param {Message} message
     */
    run : async (client, message, args) => {
        if(!message.member.roles.cache.get(config.rolelist.ticketauthorized)) return
        const Blacklistuser = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const channel = message.guild.channels.cache.find(x => x.name === Blacklistuser.id)
        let blacklistnotfound = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("RED").setTimestamp().setFooter('This Warning Is Gonna Be Deleted After 10 Seconds!').addField('Invalid User',`Make Sure You Have Done Everything Right`);
        if(!Blacklistuser) return message.channel.send(blacklistnotfound).then(x => x.delete({timeout: 10000}))

        blacklist.findOne({ id : Blacklistuser.user.id }, async(err,data) => {
            if(err) throw err;
            if(data) {
                let blacklistalready = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("RED").setTimestamp().setFooter('This Warning Is Gonna Be Deleted After 10 Seconds!').addField('This User Is Already Blacklisted',`**${Blacklistuser.user.tag}** RIP :D`);
                message.channel.send(blacklistalready).then(x => x.delete({timeout: 10000}))
            } else {
                data = new blacklist({id : Blacklistuser.user.id })
                data.save()
                .catch(err => console.log(err))
                channel.send(`@everyone | Channel is going to be deleted in 10 seconds..`)
                setTimeout(() => {
                    channel.delete()
                }, 10000)
                let blacklistadded = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("#55ff76").setTimestamp().setFooter('This Warning Is Gonna Be Deleted After 15 Seconds!').addField('User Has Been Blacklisted',` ${Blacklistuser.user.tag} I Hope You Regret Whatever You Have Done XD`);
            (await message.channel.send(blacklistadded)).then(x => x.delete({timeout: 15000}))
            client.channels.cache.get(config.channellist.ticketlogchannel).send(new Discord.MessageEmbed().setAuthor(Blacklistuser.displayName, Blacklistuser.avatarURL({dynamic: true})).setColor("#4a0000").setTimestamp().setFooter('Niyuki was Alone!').setTitle('Ticket Log').setDescription(`Ticket of ${Blacklistuser} has succesfully been blacklisted by ${message.author} \n \`This user will not be able to use any commands again until an authorized removes that user!\``))
            }
            
        })
}}
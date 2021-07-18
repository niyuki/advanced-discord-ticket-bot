const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../setting.json')


module.exports = {
    name: 'forceclose',
    aliases: [''],
    description: 'Closes the current ticket (Only Ticket Authorized)',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let categories = config.channellist.ticketcategory;

        if(!categories.includes(message.channel.id)) return message.reply('❌ | Only in ticket category!').then(x => x.delete({timeout: 5000}))

        if(!message.member.roles.cache.get(config.rolelist.ticketauthorized)) return message.reply('❌ | Only ticket authorized can use this!').then(x => x.delete({timeout: 5000}))
        await schema.findOneAndDelete({ User: message.channel.name })
        message.channel.send(`@everyone | Channel is going to be deleted in 10 seconds..`)
        setTimeout(() => {
            message.channel.delete()
        }, 10000)    
        let reason = args.join(" ")
        if(!reason) return message.reply('Please provide a valid reason to close this ticket. | Example: .forceclose ticket solved')
        let x= client.users.cache.find(x => x.id === message.channel.name)
        client.channels.cache.get(config.channellist.ticketlogchannel).send(new Discord.MessageEmbed().setAuthor(x.displayName, x.avatarURL({dynamic: true})).setColor("#55ff76").setTimestamp().setFooter('Niyuki was Alone!').setTitle('Ticket Log').setDescription(`Ticket of ${x} has succesfully closed the ticket by ${message.author} \n \`Reason: ${reason}\` \n Head over to <#${config.channellist.createticketchannel}> to create a new ticket!`))

    }
}
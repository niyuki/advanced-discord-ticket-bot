const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../setting.json')


module.exports = {
    name: 'close',
    aliases: [''],
    description: 'Closes the current ticket (Only Ticket Owner)',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let categories = config.channellist.ticketcategory;

        if(!categories.includes(message.channel.id)) return message.reply('❌ | Only in ticket category!').then(x => x.delete({timeout: 5000}))
        if(message.channel.name !== message.author.id) return message.reply('❌ | Only ticket owner can use this!').then(x => x.delete({timeout: 5000}))
        await schema.findOneAndDelete({ User: message.author.id })
        button.channel.send(`@everyone | Channel is going to be deleted in 10 seconds..`)
        setTimeout(() => {
            message.channel.delete()
        }, 10000)    
        client.channels.cache.get(config.channellist.ticketlogchannel).send(new Discord.MessageEmbed().setAuthor(message.author.displayName, message.author.avatarURL({dynamic: true})).setColor("#55ff76").setTimestamp().setFooter('Niyuki was Alone!').setTitle('Ticket Log').setDescription(`Ticket of ${message.author} has succesfully closed the ticket by himself.. \n Head over to <#${config.channellist.createticketchannel}> to create a new ticket!`))
    }
}
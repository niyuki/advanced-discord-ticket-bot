const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../setting.json')
const schema = require('../../schema')
const moment = require('moment')
module.exports = {
    name: 'info',
    aliases: ['i'],
    description: 'Gets info about your ticket',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const victim = message.mentions.members.first() || message.author
        const infoembed = new MessageEmbed()
            .setFooter('Niyuki Was Alone')
            .setAuthor(victim.username, victim.displayAvatarURL({ dynamic: true }))
        
        const total = await client.total(victim.id)

        await schema.findOne({User: victim.id}, async(err, data) => {
            if(err) throw err;
                message.channel.send(infoembed.setTitle('Ticket Information').setColor('RANDOM').setDescription(`${data ? `<#${data.OpenedTicketChannel}>` : 'No Ticket Channel'} \`\`\` User: ${victim.tag} - (${victim.id}) \n Opened Ticket: ${data ? `✅ \n Time: ${moment(data.OpenedTicketTime).fromNow()} -> (${moment(data.OpenedTicketTime)})` : `❌ -> Go get a new ticket at <#${config.channellist.createticketchannel}>`} \n Total Opened Tickets: ${total}\`\`\` `))
            
        })

    }
}
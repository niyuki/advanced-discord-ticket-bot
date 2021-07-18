const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../setting.json')
const schema = require('../../schema')
const { MessageButton, MessageActionRow } = require('discord-buttons')

module.exports = {
    name: 'ticket',
    aliases: ['createticket'],
    description: 'create',
    cooldown: 1000*60*30,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const infoembed = new MessageEmbed()
        .setFooter('Niyuki Was Alone')
        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    
        if(message.channel.id !== config.channellist.createticketchannel) return message.reply(`Only here -> <#${config.channellist.createticketchannel}>`).then(x => x.delete({timeout:6500}))
        
        if(!message.member.roles.cache.get(config.rolelist.openticket)) return message.reply(infoembed.setColor('4a0000').setDescription(await client.translate(`You need the <&@${config.rolelist.openticket}> role to create a new ticket!`, message)))
        
        const ch = message.guild.channels.cache.find(ch => ch.name === message.author.id)
        if(ch) {
            message.react('❌')
            message.reply(infoembed.setColor('4a0000').setDescription(await client.translate(`You dum dum have already opened a ticket.. \n Go to ${ch}`, message)).setTitle('😔')).then(x => x.delete({timeout: 6500}))
            ch.send(await client.translate(`${message.author} Your channel is here not elsewhere okay. Don't go to create another Ticket please `, message)).then(x => x.react('😔'))
        } else {
                message.react('✅')
                let closebtn = new MessageButton()
                .setLabel("Close this ticket 🗑")
                .setID("close")
                .setStyle("green");
                let forceclosebtn = new MessageButton()
                .setLabel("Forceclose this ticket 🗑 (Only Authorized)")
                .setID("forceclose")
                .setStyle("blurple");
                let blacklistbtn = new MessageButton()
                .setLabel("Blacklist this User 📵 (Only Authorized)")
                .setID("blacklist")
                .setStyle("red");
               message.guild.channels.create(`${message.author.id}`, {
                    type : 'text',
                    parent : config.channellist.ticketcategory,
                    permissionOverwrites : [
                        {
                            id : message.guild.id,
                            deny : ['VIEW_CHANNEL']
                        },
                        {
                            id : message.author.id,
                            allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES']
                        },
                        {
                            id : config.rolelist.ticketauthorized,
                            allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES', 'MANAGE_MESSAGES', 'EMBED_LINKS']
                        }
                    ]
                }).then(async channel=> {
                    message.reply(infoembed.setColor('00ff9d').setDescription(await client.translate(`Success <#${channel.id}> to view your ticket`, message))).then( x=> x.delete({timeout: 6500}))
                    channel.send(`<@&${config.rolelist.ticketauthorized}>`,{embed: new MessageEmbed().setTitle(`${message.author.username}, welcome to your ticket!`).setColor("RANDOM").setAuthor(message.author.tag+` - (${message.author.id})`, message.author.displayAvatarURL({dynamic: true})).setDescription(`**__User Commands__**: \n ${client.prefix}close \`Close this ticket with command!\` \n ${client.prefix}info \`Get Info about a user(and his ticket)\` \n\n **__Staff Commands__**: \n${client.prefix}forceclose \`Forces to close the room\` \n ${client.prefix}blacklist \`If this ticket was a troll or joke, to blacklist the ticketuser\` \`\`\` You can also use this buttons below to take actions! \`\`\` `), buttons: [closebtn,forceclosebtn,blacklistbtn]})
                            new schema({
                                User: message.author.id,
                                OpenedTicketChannel: channel.id,
                                OpenedTicketTime: Date.now(),
                            }).save();  
                            client.open(message.author.id, 1)
        
                })
            }
        
    }
}
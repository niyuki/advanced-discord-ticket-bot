const { Client, Message, MessageEmbed } = require('discord.js');
const config = require('../../setting.json')

module.exports = {
    name: 'clear',
    aliases: ['purge'],
    description: 'Clear an specific amount of messages',
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const victim = message.mentions.members.first();
        const messages = message.channel.messages.fetch();

        if(victim) {
            const victimMsgs = (await messages).filter(
                (m) => m.author.id === victim.id);
            await message.channel.bulkDelete(userMessages);
            message.channel.send(`${victim} messages has been deleted`)
        } else {
            if(!args[0])
                return message.channel.send(await client.translate("Please clarify a number of messages to delete between 1 and 99", message))
            if(isNaN(args[0]))
                return message.channel.send(await client.translate("I hope you know that only numbers are allowed 🥱", message))
            if(parseInt(args[0]) > 99) 
                return message.channel.send('Maximum amount to purge is 99 😡')
            await message.channel
                .bulkDelete(parseInt(args[0]) + 1)
                .catch(err => console.log(err))
            message.channel.send('Deleted ' + args[0]  + " messages.").then(x => x.react('😋'))
        }
    }
}
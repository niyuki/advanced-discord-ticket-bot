const { MessageEmbed } = require('discord.js')
const moment = require('moment')

module.exports = {
  name: 'snipe',
  aliases: [],
  category: ['s'],
  usage: '.snipe <all/1-5>',
  description: 'snipe but with more swag B)',
  userPermissions: ["MANAGE_MESSAGES"],
  botPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
  async run(client, message, args) {
    const snipes = client.snipes.get(message.channel.id);
    if(!snipes) return message.reply('Nothing to snipe here 😔').then(x => x.delete({timeout: 3500}))

    const snipe = +args[0] - 1 || 0;
    const target = snipes[snipe];
    if(!target) return message.reply(`There is only ${snipes.length} messages, don't be dumb 😋`)

    const { msg, time, image } = target;

    const snipeembed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(msg.content)
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setImage(image)
        .setFooter(`${moment(time).fromNow()} | ${snipe + 1} / ${snipes.length}`)
    
    message.channel.send(snipeembed)

  }
}
const { MessageEmbed } = require('discord.js')
const config = require('../../setting.json')
const pm = require('pretty-ms');


module.exports = {
  name: 'ping',
  aliases: [],
  category: ['Info'],
  usage: '.ping',
  description: 'Ping but with more swag B)',
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["EMBED_LINKS"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
  async run(client, message, args) {

   const msg = await message.channel.send(await client.translate("🏓 Pinging...",message));

    const botLatency = pm(msg.createdTimestamp - message.createdTimestamp)
    const shardLatency = pm(message.guild.shard.ping);
    
    const embed = new MessageEmbed()
      .setAuthor('🏓Pong!')
      .setColor('RANDOM')
      .addFields({
          name: await client.translate('Message Latency:', message),
          value: `${botLatency}`,
          inline: true
        }, {
          name: `Shard ${await client.translate(` | ${message.guild.shard.id} Latency:`, message)}`,
          value: `${shardLatency}`,
          inline: true
        })
  

    await msg.edit(embed)
  }
}
const client = require('../../niyuki');
const config = require('../../setting.json')
const { MessageMenuOption, MessageMenu, MessageActionRow } = require('discord-buttons')

client.on('clickButton', async (button) => {
    const select1 = new MessageMenuOption()
      .setLabel(`Reason 1`)
      .setDescription(`Ticket is solved!`)
      .setEmoji(`✅`)
      .setValue(`r1`);

    const select2 = new MessageMenuOption()
      .setLabel(`Reason 2`)
      .setDescription(`Ticket was not able to be solved`)
      .setEmoji(`😥`)
      .setValue(`r2`);

    const select3 = new MessageMenuOption()
      .setLabel(`Reason 3`)
      .setDescription(`User did not pay attention`)
      .setEmoji(`👨‍🎓`)
      .setValue(`r3`);

    const select4 = new MessageMenuOption()
      .setLabel(`Reason 4`)
      .setDescription(`amogus`)
      .setEmoji(`🤡`)
      .setValue(`r4`);

    const OMG = new MessageMenu()
    .setID(`niyukiispog`)
    .setPlaceholder(await client.translate(`Choose one reason or i will stab you and haunt you 👻`))
    .addOption(select1)
    .addOption(select2)
    .addOption(select3)
    .addOption(select4)

    const Rowwwww = new MessageActionRow().addComponent(OMG);
    if(button.id == "close") {
        if(button.clicker.member.user.id !== button.channel.name) return
        await schema.findOneAndDelete({ User: button.channel.name, OpenedTicketChannel: button.channel.id })
        button.channel.send(`@everyone | Channel is going to be deleted in 10 seconds..`)
        setTimeout(() => {
            button.channel.delete()
        }, 10000)
        client.channels.cache.get(config.channellist.ticketlogchannel).send(new Discord.MessageEmbed().setAuthor(button.clicker.member.displayName, button.clicker.member.avatarURL({dynamic: true})).setColor("#55ff76").setTimestamp().setFooter('Niyuki was Alone!').setTitle('Ticket Log').setDescription(`Ticket of ${button.clicker.member} has succesfully closed the ticket by himself.. \n Head over to <#${config.channellist.createticketchannel}> to create a new ticket!`))    
    } else if(button.id == "forceclose") {
        if(!button.clicker.member.roles.cache.get(config.rolelist.ticketauthorized)) return
        await schema.findOneAndDelete({ User: button.channel.name, OpenedTicketChannel: button.channel.id })
        await button.channel.send(`Reason for Closing`, {
            components: [Rowwwww],
          });
    } else if(button.id == "blacklist") {
        const blacklist = require('../../models/blacklist')
        if(!button.clicker.member.roles.cache.get(config.rolelist.ticketauthorized)) return
        x = new blacklist({id : button.channel.name })
        x.save()
        .catch(err => console.log(err))
        await schema.findOneAndDelete({ User: button.channel.name, OpenedTicketChannel: button.channel.id })
        let blacklistadded = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("#55ff76").setTimestamp().setFooter('This Warning Is Gonna Be Deleted After 15 Seconds!').addField('User Has Been Blacklisted | Channel is going to be deleted in 10 seconds',` ${Blacklistuser.user.tag} I Hope You Regret Whatever You Have Done XD`);
        (await button.channel.send(blacklistadded)).then(x => x.delete({timeout: 15000}))
        setTimeout(() => {
            button.channel.delete()
        }, 10000)      
        let x= client.users.cache.find(x => x.id === button.channel.name)  
        client.channels.cache.get(config.channellist.ticketlogchannel).send(new Discord.MessageEmbed().setAuthor(x.displayName, x.avatarURL({dynamic: true})).setColor("#55ff76").setTimestamp().setFooter('Niyuki was Alone!').setTitle('Ticket Log').setDescription(`Ticket of ${x}-(${x.id}) has succesfully been blacklisted by ${button.clicker.member}.. \n \`This user will not be able to use any commands again until an authorized removes that user!\``))

    }
});

const client = require('../../niyuki');
const config = require('../../setting.json')
const { MessageEmbed } = require('discord.js')
client.on('clickMenu', async(menu) => {
    let Reason = ""
      if(!menu.clicker.member.roles.cache.get(config.rolelist.ticketauthorized)) return
      if(menu.values[0] === 'r1') {
        await menu.reply.defer({ ephemeral: true })
        await menu.channel.send('@everyone'+await client.translate(`Ticket is closing soon.. Reason is: Topic is solved`))
        Reason = "Topic is solved"
      }
    
      if(menu.values[0] === 'r2') {
        await menu.reply.defer({ ephemeral: true })
        await menu.channel.send('@everyone'+await client.translate(`Ticket is closing soon.. Reason is: Ticket was not able to be solved`))
        Reason = "Ticket was not able to be solved"
      }
    
      if(menu.values[0] === 'r3') {
        await menu.reply.defer()
        await menu.channel.send('@everyone'+await client.translate(`Ticket is closing soon.. Reason is: User did not pay attention to the ticket`))
        Reason = "User did not pay attention to the ticket"
        
      }
    
      if(menu.values[0] === 'r4') {
        await menu.reply.defer({ ephemeral: true })
        await menu.channel.send(`amogus \n\n🟨🟨🟨🟨\n🟨⬜⬜🟨\n🟨🟨🟨🟨💭\n🟨🟨🟨🟨💭\n🟨🟨🟨🟨 \n🟨............🟨`)
        Reason = "amogus \n\n 🟨🟨🟨🟨\n🟨⬜⬜🟨\n🟨🟨🟨🟨💭\n🟨🟨🟨🟨💭\n🟨🟨🟨🟨 \n🟨............🟨"
      }
      setTimeout(() => {
        menu.channel.delete()
    }, 15000)    
        let x= client.users.cache.find(x => x.id === menu.channel.name)
      if(x) x.send(await client.translate(`Ticket Closed. Reach ${menu.clicker} for more details - \`ID: ${menu.clicker.id}\` \`Reason: ${Reason}\` `))
      client.channels.cache.get(config.channellist.ticketlogchannel).send(new MessageEmbed().setAuthor(x.displayName, x.avatarURL({dynamic: true})).setColor("#55ff76").setTimestamp().setFooter('Niyuki was Alone!').setTitle('Ticket Log').setDescription(`Ticket of ${x}-(${x.id}) has succesfully closed the ticket by ${menu.clicker.member} \n \`Reason: ${Reason}\` \n Head over to <#${config.channellist.createticketchannel}> to create a new ticket!`))

    })

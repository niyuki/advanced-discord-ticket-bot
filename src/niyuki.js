const { Collection, Client, Discord } = require('discord.js');
const client = new Client({
    disableMention: 'everyone'
});
require('discord-buttons')(client)
const translate = require('@iamtraction/google-translate')
const path = require('path')
const fs = require('fs')
const config = require('./setting.json');
module.exports = client;
client.commands = new Collection();
client.prefix = config.panel.prefix;
client.aliases = new Collection();
client.categories = fs.readdirSync(path.resolve('src/commands'));
client.snipes = new Collection();
["command"].forEach(handler => {
    require(path.resolve(`src/handlers/${handler}`))(client);
}); 

//----------------------TRANSLATE THE WHOLE BOT FOR YOU---------------//

client.translate = async(text) => {
    const lang = config.panel.language ? config.panel.language : 'en'
    const translated = await translate(text, {from: 'en', to: lang});
    return translated.text;
}

//---------------------------SELFDEAF & SELFMUTE
client.on('voiceStateUpdate', async (___, newState) => {
    //---SELFDEAF
    if(
        newState.member.user.bot &&
        newState.channelID &&
        newState.member.user.id == client.user.id && !newState.selfDeaf
    ) return newState.setSelfDeaf(true);
    //---SELFMUTE
    if(
        newState.member.user.bot &&
        newState.channelID &&
        newState.member.user.id == client.user.id && !newState.selfMute
    ) return newState.setSelfMute(true);
})

//---------------------CONNECT MONGO
const mongoose = require('mongoose');
const ora = require('ora');

mongoose.connect(config.panel.mongopath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).catch (error => {
    console.log('I was not able to connect to MongoDB! Please check for any errors.')
    console.log(`Mongo Error: ${error}`)
})

mongoose.connection.on('connected', () => {
    const spinner = ora(`Trying to connect to MongoDB...`).start();

	spinner.succeed('Connected to MongoDB')
})

client.on('ready', () => { 
    const spinner2 = ora(`${client.user.username} is logging in...`).start();
    setTimeout(() => {
        spinner2.succeed(`${client.user.username} has succesfully logged in now.`)
    }, 2500);
})
//Systems
const schema = require('./models/totalticket')
client.total = (User) => new Promise(async ful => {
    const data = await schema.findOne({ User });
    if(!data) return ful(0);
    ful(data.TotalTicket)
})
client.open = (User, TotalTicket) => {
    schema.findOne({ User }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.TotalTicket = TotalTicket;
        } else {
            data = new schema({ User, TotalTicket })
        }
        data.save();
    })
} 

//---------BOT LOGIN
client.login(config.panel.token);
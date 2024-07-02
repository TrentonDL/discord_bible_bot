require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }

    if (message.content === 'hello') {
        message.reply('hello');
    }
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'hey'){
        interaction.reply('hey!');
    }

    if(interaction.commandName === 'ping'){
        interaction.reply('Pong!');
    }

    if (interaction.commandName === 'add'){
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;

        interaction.reply(`The sum of ${num1} + ${num2} = ${num1+num2}!`);
    }

    if(interaction.commandName === 'bible'){
        const book = interaction.options.get('book').value;
        const chapter = interaction.options.get('chapter').value;
        
        var verse = '0';
        if( interaction.options.get('verses') !== null ){
            verse = interaction.options.get('verses').value;
        }

        var version = '';
        if( interaction.options.get('version') !== null ){
            version = interaction.options.get('version').value;
        }

        if ( version === '' ) version = 'esv';

        if (verse !== '0' ) {
            fetch(
                `https://github.com/gh/wldeh/bible-api/bibles/en-${version}/books/${book}/chapters/${chapter}/verses/${verse}.json`
            )
            .then((response) => response.json())
            .then((data) => console.log(data.text));
        }
        
        if (verse === '0') {
            fetch(
                `https://github.com/gh/wldeh/bible-api/bibles/en-${version}/books/${book}/chapters/${chapter}.json`
            )
            .then((response) => response.json())
            .then((data) => interaction.reply(`${data.text}`));
        }
    }
});

client.login(process.env.TOKEN);
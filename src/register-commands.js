require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType, Options } = require('discord.js');

const commands = [
    {
        name: 'hey',
        description: 'Replies with hey!',
    },
    {
        name: 'ping',
        description: 'Pong!',
    },
    {
        name: 'add',
        description: 'Adds two numbers.',
        options: [
            {
                name: 'first-number',
                description: 'The first number.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'second-number',
                description: 'The second number.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },
    {
        name: 'bible',
        description: 'Fetches bible verses with a given Book, Chapter and Verses',
        options: [
            {
                name: 'book',
                description: 'Book of the bible',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: 'Genesis',
                        value: 'genesis',
                    },
                    {
                        name: 'Exodus',
                        value: 'exodus',
                    },
                    {
                        name: 'Leviticus',
                        value: 'leviticus',
                    },
                    {
                        name: 'Numbers',
                        value: 'numbers',
                    },
                    {
                        name: 'Deuteronomy',
                        value: 'Deuteronomy',
                    },
                ],
            },
            {
                name: 'chapter',
                description: 'chapter number in the book',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'verses',
                description: 'given a verses, range of verses, or leave blank for full chapter',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'version',
                description: 'bible version, if blank default is ESV',
                type: ApplicationCommandOptionType.String,
            },
        ],
    },
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
                ),
            { body: commands }    
        )

        console.log('Slash commands were registered successfully!');
    }catch (err) {
        console.log(`Error: ${err}`);
    }
})();
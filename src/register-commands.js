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
                        value: 'deuteronomy',
                    },
                    {
                        name: 'Joshua',
                        value: 'joshua',
                    },
                    {
                        name:'Judges',
                        value: 'judges'
                    },
                    {
                        name: 'Ruth',
                        value: 'ruth',
                    },
                    {
                        name: '1 Samuel',
                        value: '1 samuel',
                    },
                    {
                        name: '2 Samuel',
                        value: '2 samuel',
                    },
                    {
                        name: '1 Kings',
                        value: '1 kings',
                    },
                    {
                        name: '2 Kings',
                        value: '2 kings',
                    },
                    {
                        name: '1 Chronicles',
                        value: '1 chronicles',
                    },
                    {
                        name: '2 Chronicles',
                        value: '2 chronicles',
                    },
                    {
                        name: 'Ezra',
                        value: 'ezra',
                    },
                    {
                        name: 'Nehemiah',
                        value: 'nehemiah',
                    },
                    {
                        name: 'Esther',
                        value: 'esther',
                    },
                    {
                        name: 'Job',
                        value: 'job',
                    },
                    {
                        name: 'Psalms',
                        value: 'psalms',
                    },
                    {
                        name: 'Proverbs',
                        value: 'proverbs',
                    },
                    {
                        name: 'Ecclesiastes',
                        value: 'ecclesiastes',
                    },
                    {
                        name: 'Song of Solomon',
                        value: 'song of solomon',
                    },
                    {
                        name: 'Isaiah',
                        value: 'isaiah',
                    },
                    {
                        name: 'Jeremiah',
                        value: 'jeremiah',
                    },
                    {
                        name: 'Lamentations',
                        value: 'lamentations',
                    },
                    {
                        name: 'Ezekiel',
                        value: 'ezekiel',
                    },
                    {
                        name: 'Daniel',
                        value: 'daniel',
                    },
                    {
                        name: 'Hosea',
                        value: 'hosea',
                    },
                    {
                        name: 'Joel',
                        value: 'joel',
                    },
                    {
                        name: 'Amos',
                        value: 'amos',
                    },
                    {
                        name: 'Obadiah',
                        value: 'obadiah',
                    },
                    {
                        name: 'Jonah',
                        value: 'jonah',
                    },
                    {
                        name: 'Micah',
                        value: 'micah',
                    },
                    {
                        name: 'Nahum',
                        value: 'nahum',
                    },
                    {
                        name: 'Habakkuk',
                        value: 'habakkuk',
                    },
                    {
                        name: 'Zephaniah',
                        value: 'zephaniah',
                    },
                    {
                        name: 'Haggai',
                        value: 'haggai',
                    },
                    {
                        name: 'Zechariah',
                        value: 'zechariah',
                    },
                    {
                        name: 'Malachi',
                        value: 'malachi',
                    },
                    {
                        name: 'Matthew',
                        value: 'matthew',
                    },
                    {
                        name: 'Mark',
                        value: 'mark',
                    },
                    {
                        name: 'Luke',
                        value: 'luke',
                    },
                    {
                        name: 'John',
                        value: 'john',
                    },
                    {
                        name: 'Acts',
                        value: 'acts',
                    },
                    {
                        name: 'Romans',
                        value: 'romans',
                    },
                    {
                        name: '1 Chorinthians',
                        value: '1 chorinthians',
                    },
                    {
                        name: '2 Chorinthians',
                        value: '2 chorinthians',
                    },
                    {
                        name: 'Galatians',
                        value: 'galatians',
                    },
                    {
                        name: 'Ephesians',
                        value: 'ephesians',
                    },
                    {
                        name: 'Philippians',
                        value: 'philippians',
                    },
                    {
                        name: 'Colossians',
                        value: 'colossians',
                    },
                    {
                        name: '1 Thessalonians',
                        value: '1 thessalonians',
                    },
                    {
                        name: '2 Thessalonians',
                        value: '2 thessalonians',
                    },
                    {
                        name: '1 Timothy',
                        value: '1 Timothy',
                    },
                    {
                        name: '2 Timothy',
                        value: '2 Timothy',
                    },
                    {
                        name: 'Titus',
                        value: 'titus',
                    },
                    {
                        name: 'Philemon',
                        value: 'philemon',
                    },
                    {
                        name: 'Hebrews',
                        value: 'hebrews',
                    },
                    {
                        name: 'James',
                        value: 'james',
                    },
                    {
                        name: '1 Peter',
                        value: '1 peter',
                    },
                    {
                        name: '2 Peter',
                        value: '2 peter',
                    },
                    {
                        name: '1 John',
                        value: '1 john',
                    },
                    {
                        name: '2 John',
                        value: '2 john',
                    },
                    {
                        name: '3 John',
                        value: '3 john',
                    },
                    {
                        name: 'Jude',
                        value: 'jude',
                    },
                    {
                        name: 'Revelation',
                        value: 'revelation',
                    }
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
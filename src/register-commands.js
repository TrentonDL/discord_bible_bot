require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType} = require('discord.js');

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
                name: 'testement',
                description: 'New or Old Testement',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: 'New Testement',
                        value: 'new'
                    },
                    {
                        name: 'Old Testement',
                        value: 'old'
                    }
                ]
            },
            {
                name: 'book_prefix',
                description: 'Numbered books',
                type: ApplicationCommandOptionType.Integer,
                required: false,
                choices: [
                    {
                        name: '1',
                        value: 1
                    },
                    {
                        name: '2',
                        value: 2
                    },
                    {
                        name: '3',
                        value: 3
                    }
                ]
            },
            {
                name: 'book',
                description: 'Book of the bible',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    /*{
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
                        name: 'Samuel',
                        value: 'samuel',
                    },
                    {
                        name: 'Kings',
                        value: 'kings',
                    },
                    {
                        name: 'Chronicles',
                        value: 'chronicles',
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
                        value: 'songofsolomon',
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
                    },*/
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
                        name: 'Corinthians',
                        value: 'corinthians',
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
                        name: 'Thessalonians',
                        value: 'thessalonians',
                    },
                    {
                        name: 'Timothy',
                        value: 'timothy',
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
                        name: 'Peter',
                        value: 'peter',
                    },
                    {
                        name: 'John',
                        value: 'john',
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
                description: 'Chapter # in the book',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'verses',
                description: 'Verse # or range of verses',
                type: ApplicationCommandOptionType.String,
                required: true,
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
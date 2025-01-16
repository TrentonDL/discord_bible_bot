const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
//             {
//                 name: 'book',
//                 description: 'Book of the bible',
//                 type: ApplicationCommandOptionType.String,
//                 required: true,
//                 choices: [
//                     /*{
//                         name: 'Genesis',
//                         value: 'genesis',
//                     },
//                     {
//                         name: 'Exodus',
//                         value: 'exodus',
//                     },
//                     {
//                         name: 'Leviticus',
//                         value: 'leviticus',
//                     },
//                     {
//                         name: 'Numbers',
//                         value: 'numbers',
//                     },
//                     {
//                         name: 'Deuteronomy',
//                         value: 'deuteronomy',
//                     },
//                     {
//                         name: 'Joshua',
//                         value: 'joshua',
//                     },
//                     {
//                         name:'Judges',
//                         value: 'judges'
//                     },
//                     {
//                         name: 'Ruth',
//                         value: 'ruth',
//                     },
//                     {
//                         name: 'Samuel',
//                         value: 'samuel',
//                     },
//                     {
//                         name: 'Kings',
//                         value: 'kings',
//                     },
//                     {
//                         name: 'Chronicles',
//                         value: 'chronicles',
//                     },
//                     {
//                         name: 'Ezra',
//                         value: 'ezra',
//                     },
//                     {
//                         name: 'Nehemiah',
//                         value: 'nehemiah',
//                     },
//                     {
//                         name: 'Esther',
//                         value: 'esther',
//                     },
//                     {
//                         name: 'Job',
//                         value: 'job',
//                     },
//                     {
//                         name: 'Psalms',
//                         value: 'psalms',
//                     },
//                     {
//                         name: 'Proverbs',
//                         value: 'proverbs',
//                     },
//                     {
//                         name: 'Ecclesiastes',
//                         value: 'ecclesiastes',
//                     },
//                     {
//                         name: 'Song of Solomon',
//                         value: 'songofsolomon',
//                     },
//                     {
//                         name: 'Isaiah',
//                         value: 'isaiah',
//                     },
//                     {
//                         name: 'Jeremiah',
//                         value: 'jeremiah',
//                     },
//                     {
//                         name: 'Lamentations',
//                         value: 'lamentations',
//                     },
//                     {
//                         name: 'Ezekiel',
//                         value: 'ezekiel',
//                     },
//                     {
//                         name: 'Daniel',
//                         value: 'daniel',
//                     },
//                     {
//                         name: 'Hosea',
//                         value: 'hosea',
//                     },
//                     {
//                         name: 'Joel',
//                         value: 'joel',
//                     },
//                     {
//                         name: 'Amos',
//                         value: 'amos',
//                     },
//                     {
//                         name: 'Obadiah',
//                         value: 'obadiah',
//                     },
//                     {
//                         name: 'Jonah',
//                         value: 'jonah',
//                     },
//                     {
//                         name: 'Micah',
//                         value: 'micah',
//                     },
//                     {
//                         name: 'Nahum',
//                         value: 'nahum',
//                     },
//                     {
//                         name: 'Habakkuk',
//                         value: 'habakkuk',
//                     },
//                     {
//                         name: 'Zephaniah',
//                         value: 'zephaniah',
//                     },
//                     {
//                         name: 'Haggai',
//                         value: 'haggai',
//                     },
//                     {
//                         name: 'Zechariah',
//                         value: 'zechariah',
//                     },
//                     {
//                         name: 'Malachi',
//                         value: 'malachi',
//                     },*/
//                     {
//                         name: 'Matthew',
//                         value: 'matthew',
//                     },
//                     {
//                         name: 'Mark',
//                         value: 'mark',
//                     },
//                     {
//                         name: 'Luke',
//                         value: 'luke',
//                     },
//                     {
//                         name: 'John',
//                         value: 'john',
//                     },
//                     {
//                         name: 'Acts',
//                         value: 'acts',
//                     },
//                     {
//                         name: 'Romans',
//                         value: 'romans',
//                     },
//                     {
//                         name: 'Corinthians',
//                         value: 'corinthians',
//                     },
//                     {
//                         name: 'Galatians',
//                         value: 'galatians',
//                     },
//                     {
//                         name: 'Ephesians',
//                         value: 'ephesians',
//                     },
//                     {
//                         name: 'Philippians',
//                         value: 'philippians',
//                     },
//                     {
//                         name: 'Colossians',
//                         value: 'colossians',
//                     },
//                     {
//                         name: 'Thessalonians',
//                         value: 'thessalonians',
//                     },
//                     {
//                         name: 'Timothy',
//                         value: 'timothy',
//                     },
//                     {
//                         name: 'Titus',
//                         value: 'titus',
//                     },
//                     {
//                         name: 'Philemon',
//                         value: 'philemon',
//                     },
//                     {
//                         name: 'Hebrews',
//                         value: 'hebrews',
//                     },
//                     {
//                         name: 'James',
//                         value: 'james',
//                     },
//                     {
//                         name: 'Peter',
//                         value: 'peter',
//                     },
//                     {
//                         name: 'John',
//                         value: 'john',
//                     },
//                     {
//                         name: 'Jude',
//                         value: 'jude',
//                     },
//                     {
//                         name: 'Revelation',
//                         value: 'revelation',
//                     }
//                 ],
//             },
//             {
//                 name: 'chapter',
//                 description: 'Chapter # in the book',
//                 type: ApplicationCommandOptionType.Number,
//                 required: true,
//             },
//             {
//                 name: 'verses',
//                 description: 'Verse # or range of verses',
//                 type: ApplicationCommandOptionType.String,
//                 required: true,
//             },
//         ],
//     },
// ];

// const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

// (async () => {
//     try {
//         console.log('Registering slash commands...');

//         await rest.put(
//             Routes.applicationGuildCommands(
//                 process.env.CLIENT_ID,
//                 process.env.GUILD_ID
//                 ),
//             { body: commands }
//         )
//         console.log('Slash commands were registered successfully!');
//     }catch (err) {
//         console.log(`Error: ${err}`);
//     }
// })();
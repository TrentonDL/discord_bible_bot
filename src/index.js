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

client.on('interactionCreate', async (interaction) => {
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

    if (interaction.commandName === 'bible') {
        const book = interaction.options.get('book').value;
        const chapter = interaction.options.get('chapter').value;

        let verse = '0';
        if (interaction.options.get('verses') !== null) {
            verse = interaction.options.get('verses').value;
        }

        let version = 'en-webus'; // Default version
        if (interaction.options.get('version') !== null) {
            version = interaction.options.get('version').value;
        }

        let url = `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/${version}/books/${book}/chapters/${chapter}`
        try {
            let text;
            if (verse !== '0') {
                text = await ReadJSON_SingleVerse(url + `verse/${verse}.json`,verse-1);
                await interaction.reply(`${book} ${chapter}:${verse} \n ${text}`);
            } else {
                text = await ReadJSON_Chapter(url);
                await interaction.reply(`${book} ${chapter} \n ${text}`);
            }
        } catch (error) {
            console.error("Error fetching Bible text:", error);
            await interaction.reply("Sorry, I couldn't retrieve the Bible verse. Please check the inputs and try again.");
        }
    }
});

async function ReadJSON_SingleVerse(url, verse) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }
        const data = await response.json();
        return data.data[verse]?.text || "No Text Avaiable";
    } catch (error) {
        console.error("Error fetching JSON:", error);
        return null; // Indicate failure to fetch or parse JSON
    }
}

async function ReadJSON_Chapter(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }
        const data = await response.json();

        // Concatenate all verses in the chapter
        let chapterText = "";
        data.data.forEach((verse) => {
            chapterText += `${verse.verse}: ${verse.text}\n`; // Format each verse as "verse number: text"
        });

        return chapterText || "No text available for this chapter.";
    } catch (error) {
        console.error("Error fetching JSON:", error);
        return null; // Indicate failure to fetch or parse JSON
    }
}


client.login(process.env.TOKEN);
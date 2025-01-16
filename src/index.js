const { token, clientId, guildId } = require('config.json');

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

client.once(Events.ClientReady, readyClient => {
    console.log(`${readyClient.user.tag} is online`);
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
    else if (interaction.isAutocomplete()) {
        const command = interaction.Client.commands.get(interaction.commandName);
        
        if (!command){
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try{
            await command.autocomplete(interaction)
        }catch (error){
            console.error(error)
        }
    }

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

    // if (interaction.commandName === 'bible') {
    //     const book = interaction.options.get('book').value;
    //     let DisplayBook = book.charAt(0).toUpperCase() + book.slice(1);
    //     const chapter = interaction.options.get('chapter').value;

    //     let verse = '';
    //     if (interaction.options.get('verses') !== null) {
    //         verse = interaction.options.get('verses').value;
    //     }

    //     let version = 'en-webus'; // Default version
    //     if (interaction.options.get('version') !== null) {
    //         version = interaction.options.get('version').value;
    //     }
        
    //     let url = `https://raw.githubusercontent.com/wldeh/bible-api/refs/heads/main/bibles/${version}/books/${book}/chapters/${chapter}/verses/`
    //     try {
    //         let text;
    //         if (verse !== '') {
    //             text = await ReadJSON_SingleVerse(url + `${verse}.json`,verse);
    //             console.log(url + `${verse}.json`)
    //             await interaction.reply(`${DisplayBook} ${chapter}:${verse} \n ${text}`);
    //         } else {
    //             text = await ReadJSON_Chapter(url);
    //             console.log(url)
    //             await interaction.reply(`${DisplayBook} ${chapter} \n ${text}`);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching Bible text:", error);
    //         await interaction.reply("Sorry, I couldn't retrieve the Bible verse. Please check the inputs and try again.");
    //     }
    // }
});

async function ReadJSON_SingleVerse(url, verse) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }
        const data = await response.json();

        // Match the verse field and return the corresponding text
        if (data.verse === verse) {
            return data.text;
        }
        return "No matching verse found";
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


client.login(token);
const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bible')
        .setDescription('Find a specific verse of the bible in EN-WEBUS version')
        .addStringOption(option =>
            option.setName('book')
                .setDescription('Book of the Bible wanted')
                .setAutocomplete(true))
            .addStringOption(option =>
                option.setName('chapter')
                    .setDescription('Chapter Number')
                    .setAutocomplete(true))
                    .addStringOption(option =>
                        option.setName('verse')
                            .setDescription('Verse number')
                            .setAutocomplete(true)),
    
    async autocomplete(interaction) {
        const focusedOption = interaction.options.getFocused(true);
        let choices;

        if (focusedOption.name === 'book') {
            choices = [ 'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', 'Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation']
        }
        
        const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
        );
    },

    async execute(interaction){
        
    }
};
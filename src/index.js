require('dotenv').config();
const { Client, IntentsBitField, Message, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.MessageContent
    ]
})

function calculateElo(playerARating, playerBRating, result) {
    const k = 25
    const expectedA = 1 / (1 + Math.pow(10, (playerBRating - playerARating) / 400));
    const expectedB = 1 / (1 + Math.pow(10, (playerARating - playerBRating) / 400));

    const newARating = playerARating + k * (result - expectedA);
    const newBRating = playerBRating + k * ((1 - result) - expectedB);

    return {
        newARating: Math.round(newARating),
        newBRating: Math.round(newBRating)
    };
}


client.on('ready', (c) => {
    console.log(`${c.user.username} is ready`)
})

client.on('messageCreate', async (msg) => {
    try {
        if (msg.content === 'hi')
            msg.reply(`hello ${msg.author.username}`)
    } catch (error) {
        console.log(error);
    }
})

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'queue') {
        interaction.reply('you are in the queue')
    }
    if (interaction.commandName === 'leave') {
        interaction.reply('you have left the queue')
    }
    if (interaction.commandName === 'add') {
        const num1 = Number(interaction.options.get('first-number').value)
        const num2 = Number(interaction.options.get('second-number').value)
        interaction.reply(`${num1 + num2}`)
    }
    if (interaction.commandName === 'embed') {
        const embed = new EmbedBuilder()
            .setTitle('this is an embed')
            .setColor('Green')
            .setDescription('we sure did make an embed')

        interaction.reply({ embeds: [embed] })
    }

    if (interaction.commandName === 'calculate') {
        const playerAElo = Number(interaction.options.get('player_a').value)
        const playerBElo = Number(interaction.options.get('player_b').value)
        const result = Number(interaction.options.get('result').value)
        const newElos = calculateElo(playerAElo, playerBElo, result)
        interaction.reply(`Player A: ${newElos.newARating},  Player B: ${newElos.newBRating}`)
    }

})

client.login(process.env.TOKEN)
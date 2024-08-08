require('dotenv').config()
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')

const commands = [
    {
        name: 'add',
        description: 'add two numbers',
        options: [
            {
                name: 'first-number',
                required: true,
                description: 'the first number',
                type: ApplicationCommandOptionType.Number
            },
            {
                name: 'second-number',
                description: 'the second number',
                required: true,
                type: ApplicationCommandOptionType.Number
            },
        ]
    },
    {
        name: 'calculate',
        description: 'finds new elo after 2 players play a game',
        options: [
            {
                name: 'player_a',
                required: true,
                description: `Player A's elo`,
                type: ApplicationCommandOptionType.Number
            },
            {
                name: 'player_b',
                required: true,
                description: `Player B's elo`,
                type: ApplicationCommandOptionType.Number
            },
            {
                name: 'result',
                required: true,
                description: '1 if player A wins and 2 if player B wins',
                type: ApplicationCommandOptionType.Number
            },
        ]
    },
    {
        name: 'queue',
        description: 'queue for league match',
    },
    {
        name: 'leave',
        description: 'Leave the queue',
    },
    {
        name: 'embed',
        description: 'sends an embed!'
    },
]

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('registering commands');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )
    } catch (error) {
        console.log(`an error has been an error: ${error}`)
    }
})();
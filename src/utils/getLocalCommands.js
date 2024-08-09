const path = require('path')
const getAllFiles = require('./getAllFiles.js')

module.exports = (exceptions) => {
    let localCommands = []

    const commandCatagories = getAllFiles(
        path.join(__dirname, '..', 'commands'),
        true
    )

    console.log(commandCatagories)

    return localCommands
}
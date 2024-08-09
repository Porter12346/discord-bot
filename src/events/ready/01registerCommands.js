const {testServer} = require('../../../config.json')
const getLocalCommands = require('../../utils/getLocalCommands.js')

module.exports = (client) => {
    const localCommands = getLocalCommands()

    console.log(localCommands);
    
}
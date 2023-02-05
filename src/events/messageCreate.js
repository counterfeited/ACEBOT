const { Collection } = require('discord.js')
const util = require('../Utils/util');

const cooldowns = new Map();

module.exports = async(client, message) => {
    
    // BASIC CHECKS
    if(message.author.bot || !message.guild || !message.content.startsWith(client.config.prefix)) return;

    let args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    if(cmd.length == 0) return;
    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));

    // OWNERONLY CHECK
    if(command) {
        if(command.ownerOnly === true) {
            if(!client.config.owners.includes(message.author.id)) {
                return util.quickEmbed(client, message, "This command is restricted to bot owners", client.colors.red)
            }
        }
        
        // COOLDOWNS
        if(!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
        }
        const curTime = Date.now();
        const timeStamp = cooldowns.get(command.name);

        let cooldown = (command.cooldown) * 1000;
        if(!command.cooldown) cooldown = 3 * 1000;

        if(client.config.owners.includes(message.author.id)) cooldown = 0;

        if(timeStamp.has(message.author.id)) {
            const expTime = timeStamp.get(message.author.id) + cooldown;
            if(curTime < expTime) {
                const timeLeft = (expTime - curTime) / 1000;
    
                return util.quickEmbed(client, message, `Please wait **${timeLeft.toFixed(1)}** more seconds before using this command again`, client.colors.red)
            }
        }
        timeStamp.set(message.author.id, curTime);
        setTimeout(() => timeStamp.delete(message.author.id), cooldown);

        // EXECUTING COMMAND
        try {
            command.run(client, message, args, util)
        } catch {
            return;
        }
    }
}
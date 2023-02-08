const chalk = require('chalk');
const ms = require('ms');
const { EmbedBuilder } = require('discord.js');

module.exports = async(client) => {
    setTimeout(async function() {
        console.log(chalk.white(`[${chalk.blueBright("CLIENT LOGS")}]${chalk.white(" - ")}${chalk.blue("Connecting...")}`));
    }, ms("0.2s"));

    setTimeout(async function() {
        console.log(chalk.white(`[${chalk.blueBright("CLIENT LOGS")}]${chalk.white(" - ")}${chalk.blue(`Connected to ${client.user.tag}, started in ${client.guilds.cache.size} guild(s) with prefix '${client.config.prefix}'`)}`))
        console.log(" ")
    }, ms("1s"));
    console.log(" ")

    await client.user.setPresence({ activities: [{ name: client.config.presence }] });

    try {
        const embed = new EmbedBuilder()
        .setTitle("ACEBOT is now online.")
        .setColor(client.colors.accent)
        .setTimestamp()
        .setFooter({ text: `Report any issues to tyrant#1897`, iconURL: client.user.displayAvatarURL()})
        await client.channels.cache.get(client.config.logchannel).send({ embeds: [embed] })
    } catch(e) {
        console.log(e)
    }

}



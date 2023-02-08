const { EmbedBuilder } = require('discord.js');

module.exports = async(client, message) => {
    if(message.author.bot === true) {
        return;
    }
    try {
        const embed = new EmbedBuilder()
        .setTitle(`${message.author.tag}'s message was deleted`)
        .setDescription(message.content)
        .setTimestamp()
        .setColor(client.colors.accent)
        await client.channels.cache.get(client.config.logchannel).send({ embeds: [embed] })
    } catch(e) {
        console.log(e)
    }
}
const { EmbedBuilder } = require('discord.js');

module.exports = async(client, message) => {
    if(message.author.bot === true) {
        return;
    }

    try {
        const joined_embed = new EmbedBuilder()
        .setTitle(`${message.author.tag}'s message was deleted`)
        .setDescription(`**Message Content**\n${message.content}`)
        .setTimestamp()
        .setColor(client.colors.accent)
        await client.channels.cache.get(client.config.logchannel).send({ embeds: [joined_embed] })
    } catch(e) {
        console.log(e)
    }
}
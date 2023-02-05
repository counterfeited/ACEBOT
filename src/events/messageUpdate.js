const { EmbedBuilder } = require('discord.js');

module.exports = async(client, newMessage, oldMessage) => {
    
    try {
        const joined_embed = new EmbedBuilder()
        .setTitle(`Message Updated`)
        .setDescription(`**Old Message**\n\`${newMessage.content}\`\n\n**New Message**\n\`${oldMessage.content}\``)
        .setTimestamp()
        .setColor(client.colors.accent)

        await client.channels.cache.get(client.config.logchannel).send({ embeds: [joined_embed] })
    } catch(e) {
        console.log(e)
    }
}
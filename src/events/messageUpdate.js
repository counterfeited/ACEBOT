const { EmbedBuilder } = require('discord.js');

module.exports = async(client, oldMessage, newMessage) => {
    try {
        const embed = new EmbedBuilder()
        .setAuthor({name: `Message edited by ${oldMessage.author.tag}`})
        .addFields(
            { name: "Old Message Content", value: `${oldMessage.content}`, inline: true},
            { name: "New Message Content", value: `${newMessage.content}`, inline: true}
        )
        .setTimestamp()
        .setColor(client.colors.accent)

        await client.channels.cache.get(client.config.logchannel).send({ embeds: [embed] })
    } catch(e) {
        return;
    }
}
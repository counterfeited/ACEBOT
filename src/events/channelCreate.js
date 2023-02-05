const { EmbedBuilder } = require('discord.js');

module.exports = async(client, channel) => {
    try {
        const joined_embed = new EmbedBuilder()
        .setTitle("Channel has been created")
        .addFields(
            { name: "Channel Name", value: `${channel.name}`},
            { name: "Channel ID", value: `${channel.id}`}
        )
        .setTimestamp()
        .setColor(client.colors.accent)
        await client.channels.cache.get(client.config.logchannel).send({ embeds: [joined_embed] })
    } catch(e) {
        console.log(e)
    }
}
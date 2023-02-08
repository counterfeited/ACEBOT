const { EmbedBuilder } = require('discord.js');

module.exports = async(client, member) => {
    if(member.user.bot === true) {
        return;
    }
        try {
            const embed = new EmbedBuilder()
            .setDescription(`${member.user} has joined`)
            .setThumbnail(member.user.displayAvatarURL())
            .setColor(client.colors.accent)
            .setTimestamp()

            await client.channels.cache.get(client.config.logchannel).send({ embeds: [embed] })
        } catch(e) {
            console.log(e)
        }
}
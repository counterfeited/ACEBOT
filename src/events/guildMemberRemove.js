const { EmbedBuilder } = require('discord.js');

module.exports = async(client, member) => {
    if(member.user.bot === true) {
        return;
    } else {
        try {

            const joined_embed = new EmbedBuilder()
            .setDescription(`${member.user} has left`)
            .setThumbnail(member.user.displayAvatarURL())
            .setColor(client.colors.accent)
            .setTimestamp()

            await client.channels.cache.get(client.config.logchannel).send({ embeds: [joined_embed] })
        } catch(e) {
            console.log(e)
        }
    }
}
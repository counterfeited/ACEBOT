const { EmbedBuilder } = require('discord.js');

module.exports = async(client, role) => {


    try {
        const embed = new EmbedBuilder()
        .setTitle(`Role Deleted`)
        .addFields(
            { name: "Role Name", value: `${role.name}`, inline: true },
            { name: "Role ID", value: `${role.id}`, inline: true}
        )   
        .setDescription(`Was managed by external service: ${role.managed}`)
        .setTimestamp()
        .setColor(client.colors.accent)
        await client.channels.cache.get(client.config.logchannel).send({ embeds: [embed] })
    } catch(e) {
        console.log(e)
    }
}
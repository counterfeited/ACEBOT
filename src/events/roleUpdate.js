const { EmbedBuilder } = require('discord.js');

module.exports = async(client, newRole, oldRole) => {
    
    try {
        const embed = new EmbedBuilder()
        .setTitle(`Role Updated`)
        .addFields(
            { name: "Edited Role Name", value: `${oldRole.name}`, inline: true },
            { name: `Edited Role Hex`, value: `${oldRole.hexColor}`, inline: true},
            { name: "Old Role Name", value: `${newRole.name}`, inline: true },
            { name: `Old Role Hex`, value: `${newRole.hexColor}`, inline: true},
            { name: "Role ID", value: `${oldRole.id}`, inline: true}
        )   
        .setTimestamp()
        .setColor(oldRole.hexColor)

        await client.channels.cache.get(client.config.logchannel).send({ embeds: [embed] })
    } catch(e) {
        console.log(e)
    }
}
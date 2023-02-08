const { EmbedBuilder } = require('discord.js');

module.exports = async(client, role) => {


    try {
        const embed = new EmbedBuilder()
        .setTitle(`Role Created`)
        .addFields(
            { name: "Role Name", value: `${role.name}`, inline: true },
            { name: "Role Color", value: `${role.hexColor}`, inline: true},
            { name: "Role ID", value: `${role.id}`, inline: true}
        )   
        .setDescription(`Managed by external service: ${role.managed}`)
        .setTimestamp()
        .setColor(role.hexColor)

        await client.channels.cache.get(client.config.logchannel).send({ embeds: [embed] })
    } catch(e) {
        console.log(e)
    }
}
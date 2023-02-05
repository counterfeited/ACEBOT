const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "unmute",
    aliases: [""],
    category: "moderation",
    usage: "unmute <user>",
    description: "Unmute a user.",
    run: async(client, message, args, util) => {
        if(!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return util.quickEmbed(client, message, "You do not have permission to unmute members", client.colors.red);
        }

        let to_unmute = message.mentions.members.first()
        if(!to_unmute) {
            return util.quickEmbed(client, message, "Please provide a user to unmute", client.colors.red)
        }

        let muted_role = message.guild.roles.cache.find(r => r.name === "muted")


        if(!to_unmute.roles.cache.has(muted_role.id)) {
            return util.quickEmbed(client, message, "This user is not muted", client.colors.red)
        }

        let desc = `${to_unmute} has been unmuted`

        try {
            const log_embed = new EmbedBuilder()
            .setDescription(desc)
            .setColor(client.colors.accent)
            .setTimestamp()
            .setFooter({ text: `Action performed by ${message.author.username}`, iconURL: message.author.displayAvatarURL()})

            await to_unmute.roles.remove(muted_role.id)
            await client.channels.cache.get(client.config.logchannel).send({ embeds: [log_embed] })
            return util.quickEmbed(client, message, `${desc}`, client.colors.green)
        } catch(e) {
            console.log(e)
            return util.quickEmbed(client, message, `There was an error when trying to unmute ${to_unmute}`, client.colors.red)
        }
 
    }
}
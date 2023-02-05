const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "mute",
    aliases: [""],
    category: "moderation",
    usage: "mute <user> [reason]",
    description: "Mute a user.",
    run: async(client, message, args, util) => {
        if(!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return util.quickEmbed(client, message, "You do not have permission to mute members", client.colors.red);
        }

        let to_mute = message.mentions.members.first()
        if(to_mute.user.bot === true) {
            return util.quickEmbed(client, message, "You cannot mute a bot", client.colors.red)
        } 
        if (to_mute = message.author) {
            return util.quickEmbed(client, message, "You cannot mute yourself", client.colors.red)
        }
        if(!to_mute) {
            return util.quickEmbed(client, message, "Please provide a user to mute", client.colors.red)
        }

        let muted_role = message.guild.roles.cache.find(r => r.name === "muted")
        if(!muted_role) {
            try {
                await message.guild.roles.create({
                    name: "muted",
                    color: "#808080",
                    reason: "[ACEBOT] Muted role was created"
                })
            } catch {
                return util.quickembed(client, message, "There was an error when creating the muted role", client.colors.red)
            }
        }

        if(to_mute.roles.cache.has(muted_role.id)) {
            return util.quickEmbed(client, message, "This user is already muted", client.colors.red)
        }

        let reason = args.slice(1).join(" ") || ""

        let desc;
        if(!reason) {
            desc = `${to_mute} has been muted`
        } else {
            desc = `${to_mute} has been muted for \`${reason}\``
        }

        try {
            const log_embed = new EmbedBuilder()
            .setDescription(desc)
            .setColor(client.colors.accent)
            .setTimestamp()
            .setFooter({ text: `Action performed by ${message.author.username}`, iconURL: message.author.displayAvatarURL()})

            await to_mute.roles.add(muted_role.id)
            await client.channels.cache.get(client.config.logchannel).send({ embeds: [log_embed] })
            return util.quickEmbed(client, message, `${desc}`, client.colors.green)
        } catch(e) {
            console.log(e)
            return util.quickEmbed(client, message, `There was an error when trying to mute ${to_mute}`, client.colors.red)
        }
 
    }
}
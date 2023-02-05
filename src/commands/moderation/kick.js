const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "kick",
    aliases: [""],
    category: "moderation",
    usage: "kick <user> [reason]",
    description: "Kick a user.",
    run: async(client, message, args, util) => {
        if(!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return util.quickEmbed(client, message, "You do not have permission to kick members", client.colors.red);
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) { 
            return util.quickEmbed(client, message, "You must mention someone to kick", client.colors.red) 
        }
        
        if(member == message.author.id) { 
            return util.quickEmbed(client, message, "You can not kick yourself", client.colors.red)
        }

        if(!member.kickable) {
            return util.quickEmbed(client, message, "You can not kick this user", client.colors.red)
        }

        try {
            let reason = args.slice(1).join(" ")

            await member.kick({ reason: `${reason || "No reason given"}` })
            
            let desc;
            if(!reason) {
                desc = `${member} has been kicked by ${message.author}`
            } else {
                desc = `${member} has been kicked by ${message.author} for \`${reason}\``
            }

            const log_embed = new EmbedBuilder()
            .setDescription(desc)
            .setColor(client.colors.accent)
            .setTimestamp()
            .setFooter({ text: `Action performed by ${message.author.username}`, iconURL: message.author.displayAvatarURL()})

            await client.channels.cache.get(client.config.logchannel).send({ embeds: [log_embed] })
            return util.quickEmbed(client, message, desc, client.colors.green)
        } catch (e) {
            console.log(e)
            return util.quickEmbed(client, message, `There was an error when trying to kick ${member}`, client.colors.red)
        }
    }
}
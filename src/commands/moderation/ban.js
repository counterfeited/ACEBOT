const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: "ban",
    aliases: [""],
    category: "moderation",
    usage: "ban <user> [reason]",
    description: "Ban a user,",
    run: async(client, message, args, util) => {
        if(!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return util.quickEmbed(client, message, "You do not have permission to ban members", client.colors.red);
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) { 
            return util.quickEmbed(client, message, "You must mention someone to ban", client.colors.red) 
        }
        if(member == message.author.id) { 
            return util.quickEmbed(client, message, "You can not ban yourself", client.colors.red)
            
        }

        if(!member.bannable) {
            return util.quickEmbed(client, message, "You can not ban this user", client.colors.red)
        }

        try {
            let reason = args.slice(1).join(" ")

            await member.ban({ reason: `${reason || "No reason given"}` })
            
            let desc;
            if(!reason) {
                desc = `${member} has been banned by ${message.author}`
            } else {
                desc = `${member} has been banned by ${message.author} for \`${reason}\``
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
            return util.quickEmbed(client, message, `There was an error when trying to ban ${member}`, client.colors.red)
        }
    }
}
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "help",
    category: "Info",
    description: "Shows all the commands and how to use them.",
    aliases: [" "],
    usage: "help [category || command]",
    run: async(client, message, args, util) => {
        if(!args[0]) {
            const helpEmbed = new EmbedBuilder()
            .addFields(
                { name: "Moderation", value: `\`${client.config.prefix}help moderation\``, inline: true },
                { name: "Forum", value: `\`${client.config.prefix}help forum\``, inline: true },
                { name: "Info", value: `\`${client.config.prefix}help info\``, inline: true }
            )
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(client.colors.accent)

            await message.reply({
                embeds: [helpEmbed],
            })
        } else {
            const categories = fs.readdirSync('./src/commands/');
            const category = categories.filter(c => c === args[0].toLowerCase()).join("");
            if(category) {
                const commands = client.commands.filter(c => c.category.toLowerCase() === category.toLowerCase()).map(cmd => `\`${cmd.name}\``).join(", ")
                const cmdsEmbed = new EmbedBuilder()
                .setTitle(`${category.slice(0, 1).toUpperCase()}${category.slice(1)} Commands`)
                .setDescription(commands)
                .setColor(client.colors.accent)

                return message.reply({
                    embeds: [cmdsEmbed],
                })
            } else if(client.commands.has(args[0].toLowerCase())) {
                const cmd = client.commands.get(args[0].toLowerCase())
                const cmdEmbed = new EmbedBuilder()
                .setTitle(`${cmd.name.slice(0, 1).toUpperCase()}${cmd.name.slice(1).toLowerCase()}`)
                .addFields(
                    { name: "Command Information", value: `Name: \`${cmd.name || "-"}\`\nAliases: \`${cmd.aliases.join(", ") || "-"}\`\nDescription: \`${cmd.description || "-"}\`\nCategory: \`${cmd.category || "-"}\`` },
                    { name: "Command Utility", value: `Usage: \`${cmd.usage || `${cmd.name}`}\`\nCooldown: \`${cmd.cooldown || "0"}s\`` }
                )
                .setColor(client.colors.accent)
                .setFooter({ text: "Usage Syntax: <> required, [] optional, | or", iconURL: client.user.displayAvatarURL() })

                return message.reply({
                    embeds: [cmdEmbed],
                })
            } else {
                return util.quickEmbed(client, message, `I couldn't find any information for \`${args[0].toLowerCase()}\``, client.colors.red)
            }
        }
    }
}
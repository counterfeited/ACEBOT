const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "stats",
    category: "forum",
    description: "Get stats your forum.", 
    aliases: [""],
    usage: "stats",
    cooldown: 5,
    run: async(client, message, args, util) => {
        const url = `https://${client.config.url}stats`

        const headers = {
            "XF-Api-Key": client.config.api_key, 
            "XF-Api-User": "1",
        }

        let response;
        try { 
            response = await fetch(url, {method: "GET", headers: headers}).then(res => res.json())
        }
        catch (e) {
            return util.quickEmbed(client, message, "There was an error while fetching the data, please try again.", client.colors.red)
        } 
        const stat_embed = new EmbedBuilder()
        .setTitle("Forum Stats")
        .setURL('https://example.com')
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
            { name: "Totals", value: `Users: ${response.totals.users} | Threads: ${response.totals.threads} | Messages: ${response.totals.messages}`},
            { name: "Latest User", value: `Username: ${response.latest_user.username} | ID: ${response.latest_user.user_id} | Register Date: <t:${response.latest_user.register_date}:d>` },
            { name: "Online", value: `Total: ${response.online.total} | Members: ${response.online.members} | Guests: ${response.online.guests}`}
        )
        .setColor(client.colors.accent)

        await message.reply({
            embeds: [stat_embed]
        })
    }
} 

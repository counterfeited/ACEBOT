const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "user",
    category: "forum",
    description: "Get information about a user via their name.", 
    aliases: [""],
    usage: "user <username>",
    cooldown: 5,
    run: async(client, message, args, util) => {
        const name = args.join(" ")

        if(!name) {
            return util.quickEmbed(client, message, "Please enter a username to search for.", client.colors.red)
        }

        const url = `https://${client.config.url}users/find-name&username=${name}`

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

        try {
            let image = `https://example.com/forum/data/avatars/o/0/${response.exact.user_id}.jpg?`

            let username = response.exact.username
            if(response.exact.is_banned === true) {
                username = `${response.exact.username} 🚫`
            }

            const user_embed = new EmbedBuilder()
            .setTitle(`View Profile`)
            .setURL(`https://example.com/forum/index.php?members/${name}/`)
            .setThumbnail(image)
            .addFields(
                { name: "Username", value: username, inline: true },
                { name: "UID", value: `${response.exact.user_id}`, inline: true },
                { name: "Role", value: response.exact.user_title, inline: true },
                { name: "Is Admin", value: `${response.exact.is_staff}`, inline: true },
                { name: "Messages", value: `${response.exact.message_count}`, inline: true },
                { name: "Trophies", value: `${response.exact.trophy_points}`, inline: true },
                { name: "Reactions", value: `${response.exact.reaction_score}`, inline: true }
    
            )
            .setColor(client.colors.accent)

            await message.reply({
                embeds: [user_embed]
            })
        } catch {
            return util.quickEmbed(client, message, "Please provide a valid user.", client.colors.red)
        }
    }
} 
const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "uid",
    category: "forum",
    description: "Get information about a user via their UID.", 
    aliases: [""],
    usage: "uid <uid>",
    cooldown: 5,
    run: async(client, message, args, util) => {
        const uid = args[0]

        if(!uid || isNaN(args[0])) {
            return util.quickEmbed(client, message, "Please enter a UID to search for.", client.colors.red)
        }

        const url = `https://${client.config.url}users/${uid}`

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
            let image = `https://example.com/forum/data/avatars/o/0/${uid}.jpg?`

            let username = response.user.username
            if(response.user.is_banned === true) {
                username = `${response.user.username} 🚫`
            }

            const uid_embed = new EmbedBuilder()
            .setTitle(`View Profile`)
            .setURL(`https://example.com/forum/index.php?members/${uid}/`)
            .setThumbnail(image)
            .addFields(
                { name: "Username", value: username, inline: true },
                { name: "Role", value: response.user.user_title, inline: true },
                { name: "Is Admin", value: `${response.user.is_staff}`, inline: true },
                { name: "Messages", value: `${response.user.message_count}`, inline: true },
                { name: "Trophies", value: `${response.user.trophy_points}`, inline: true },
                { name: "Reactions", value: `${response.user.reaction_score}`, inline: true }
    
            )
            .setColor(client.colors.accent)
    
            await message.reply({
                embeds: [uid_embed]
            })
        } catch {
            return util.quickEmbed(client, message, "Please provide a valid UID.", client.colors.red) 
        }
    }
} 
const { EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: "inspire",
    category: "fun",
    description: "Inspires everyone.",
    aliases: [""],
    usage: "inspire",
    ownerOnly: true,
    run: async(client, message, args, util) => {
        try {
            fetch('https://inspirobot.me/api?generate=true')
            .then(res => res.text())
            .then((data) => {
                const inspire = new EmbedBuilder()
                .setImage(data)
                .setColor(client.colors.accent)
                    message.reply({
                    embeds: [inspire]
                })
            })

        } catch (e) {
            console.log(e)
        }
    }
}
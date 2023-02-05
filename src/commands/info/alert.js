const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "alert",
    category: "Info",
    description: "Alerts everyone in the server.",
    aliases: [""],
    usage: "alert <alert message>",
    ownerOnly: true,
    run: async(client, message, args, util) => {
        if(!args[0]) {
            return util.quickEmbed(client, message, "Please provide a message", client.colors.red)
        }


        try {
            const alert_embed = new EmbedBuilder()
            .setTitle("Alert")
            .setDescription(args.join(" "))
            .setColor(client.colors.accent)
            .setFooter({ text: `Alerted by ${message.author.username}` })

            client.channels.cache.get(client.config.alertchannel).send({ content: "@everyone", embeds: [alert_embed] })
        } catch(e) {
            console.log(e)
        }
    }
}
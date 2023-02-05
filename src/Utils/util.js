const { EmbedBuilder } = require('discord.js');

module.exports.quickEmbed = async function(client, message, content, color) {
    if(!client) throw new Error("[Utils] errorEmbed - client must be provided")
    if(!message) throw new Error("[Utils] errorEmbed - message must be provided")
    if(!content || typeof content !== 'string') throw new TypeError("[Utils] errorEmbed - content must be a string")
    if(!color || typeof color !== 'string') throw new TypeError("[Utils] - errorEmbed - color must be a string")

    const quick_embed = new EmbedBuilder()
    .setDescription(content)
    .setColor(color)

    await message.reply({
        embeds: [quick_embed],
    })
};
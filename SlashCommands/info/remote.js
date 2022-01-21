const { Client, CommandInteraction } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    ...new SlashCommandBuilder()
    .setName("menu")
    .setDescription("Control the TV"),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const Bravia = require('bravia')
        const tv = new Bravia('10.0.2.221', '80', '0000');
        
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('left')
                .setEmoji('864550244276764682')
                .setStyle('PRIMARY'),
        )
        .addComponents(
            new MessageButton()
            .setCustomId('up')
            .setEmoji('864550244229316658')
            .setStyle('PRIMARY'),
            );
        const row2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('left')
                .setEmoji('864550244276764682')
                .setStyle('PRIMARY'),
        )
            
            const embed = new MessageEmbed()
        .setTitle('Menu')
        .setDescription('Select an option');

        await interaction.followUp({ embeds: [embed], components: [row] });

        const filter = i => i.user.id === interaction.member.id;

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'left') {
                await i.update({ content: 'A button was clicked!', components: [] });
            }
            if (i.customId === 'up') {
                tv.send("Up").catch(console.error)
                embed.setDescription('Last Action Used: `Up`');
                await i.update({ embeds: [embed] });
            }
        });
            
    },
};

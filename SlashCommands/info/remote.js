const { Client, CommandInteraction } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    ...new SlashCommandBuilder()
    .setName("menu")
    .setDescription("Control the TV."),
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
                .setCustomId('on')
                .setEmoji('496493394831343627')
                .setStyle('PRIMARY'),
        )
        .addComponents(
            new MessageButton()
            .setCustomId('up')
            .setEmoji('864550244229316658')
            .setStyle('PRIMARY'),
            )
        .addComponents(
            new MessageButton()
                .setCustomId('off')
                .setEmoji('827688850162974720')
                .setStyle('PRIMARY'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('mute')
                .setEmoji('925786264689606706')
                .setStyle('PRIMARY'),
        );
        const row2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('left')
                .setEmoji('864550244276764682')
                .setStyle('PRIMARY'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('confirm')
                .setEmoji('839998964752973866')
                .setStyle('PRIMARY'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('right')
                .setEmoji('864550244103880735')
                .setStyle('PRIMARY'),
        )
        const row3 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('home')
                .setEmoji('🏠')
                .setStyle('PRIMARY'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('down')
                .setEmoji('864550244192747561')
                .setStyle('PRIMARY'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('none2')
                .setEmoji('934016556738961438')
                .setStyle('PRIMARY'),
        )
            
            const embed = new MessageEmbed()
        .setTitle('Tv Remote')
        .setDescription('Select an option ' + interaction.user.id);

        await interaction.followUp({ embeds: [embed], components: [row, row2, row3] });

        const filter = i => interaction.member.id === i.user.id;

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 600000 });

        collector.on('collect', async i => {
            if (i.customId === 'left') {
                tv.send("Left").catch(console.error)
                embed.setDescription('Last Action Used: `Left`');
                await i.update({ embeds: [embed] });
            }
            if (i.customId === 'up') {
                tv.send("Up").catch(console.error)
                embed.setDescription('Last Action Used: `Up`');
                await i.update({ embeds: [embed] });
            }
            if (i.customId === 'down') {
                tv.send("Down").catch(console.error)
                embed.setDescription('Last Action Used: `Down`');
                await i.update({ embeds: [embed] });
            }
            if (i.customId === 'right') {
                tv.send("Right").catch(console.error)
                embed.setDescription('Last Action Used: `Right`');
                await i.update({ embeds: [embed] });
            }
            if (i.customId === 'on') {
                tv.send("WakeUp").catch(console.error)
                embed.setDescription('Last Action Used: `On`');
                await i.update({ embeds: [embed] });
            }
            if (i.customId === 'off') {
                tv.send("PowerOff").catch(console.error)
                embed.setDescription('Last Action Used: `Off`');
                await i.update({ embeds: [embed] });
            }
            if (i.customId === 'confirm') {
                tv.send("Confirm").catch(console.error)
                embed.setDescription('Last Action Used: `Confirm`');
                await i.update({ embeds: [embed] });
            }
            if (i.customId === 'home') {
                tv.send("Home").catch(console.error)
                embed.setDescription('Last Action Used: `Home`');
                await i.update({ embeds: [embed] });
            }
        });
            
    },
};

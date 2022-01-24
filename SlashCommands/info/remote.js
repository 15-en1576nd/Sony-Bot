const { Client, CommandInteraction } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageActionRow, MessageButton } = require('discord.js');
const { TV } = require('sony-con-troller')
const config = require('../../config.json')

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
        const tv = new Bravia('10.0.2.221', '80', '0000'); // Omen
        const tv2 = new TV('10.0.2.221')
        // const tv = new Bravia('10.0.0.161', '80', '0000'); // Yanick
        // const tv2 = new TV('10.0.0.161')
        tv2.backendURL = config.api
        
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('none1')
                .setEmoji('934016556738961438')
                .setStyle('PRIMARY'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('on')
                .setEmoji('934228083244941333')
                .setStyle('PRIMARY'),
        )
        .addComponents(
            new MessageButton()
            .setCustomId('up')
            .setEmoji('934233169467674635')
            .setStyle('PRIMARY'),
            )
        .addComponents(
            new MessageButton()
                .setCustomId('off')
                .setEmoji('935088007906746368')
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
                .setCustomId('none2')
                .setEmoji('934016556738961438')
                .setStyle('PRIMARY'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('left')
                .setEmoji('934233059597910027')
                .setStyle('PRIMARY'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('confirm')
                .setEmoji('934224526659711066')
                .setStyle('PRIMARY'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('right')
                .setEmoji('934233117542211585')
                .setStyle('PRIMARY'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('browser')
                .setEmoji('935089016058040402')
                .setStyle('PRIMARY'),
        )
        const row3 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('none3')
                .setEmoji('934016556738961438')
                .setStyle('PRIMARY'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('home')
                .setEmoji('934225611751325708')
                .setStyle('PRIMARY'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('down')
                .setEmoji('934233246588366859')
                .setStyle('PRIMARY'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('application')
                .setEmoji('934230458730946650')
                .setStyle('PRIMARY'),
        )
        .addComponents(
            new MessageButton()
                .setCustomId('rick')
                .setEmoji('934229671460110426')
                .setStyle('PRIMARY'),
        )
            
            const embed = new MessageEmbed()
        .setTitle('Tv Remote')
        .setDescription('Select an option')
        .setFooter('Made by Omen')
        .setColor('#ec2234')
        .setThumbnail('https://cdn.discordapp.com/attachments/904003288213631037/935099744047472680/Omen-Logo.png')

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
            if (i.customId === 'application') {
                tv.send("ApplicationLauncher").catch(console.error)
                embed.setDescription('Last Action Used: `Application Launcher`');
                await i.update({ embeds: [embed] });
            }
            if (i.customId === 'rick') {
                embed.setDescription('Last Action Used: `Rick`');
                tv2.rickRoll()
                await i.update({ embeds: [embed] });
            }
            if (i.customId === 'browser') {
                embed.setDescription('Last Action Used: `Internet Explorer`');
                tv2.browser()
                await i.update({ embeds: [embed] });
            }
        });
            
    },
};

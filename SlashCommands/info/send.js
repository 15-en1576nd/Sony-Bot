const { Client, CommandInteraction } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    ...new SlashCommandBuilder()
    .setName("send")
    .setDescription("Send a command.")
        .addStringOption(option =>
            option.setName('command')
            .setDescription('Command to send')
            .setRequired(true)),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const Bravia = require('bravia')
        const tv = new Bravia('10.0.2.221', '80', '0000');
        const cmdd = interaction.options.getString('command');
        if (cmdd == 'DemoMode') return interaction.followUp({ content: 'nee'});
        tv.send(cmdd).catch(console.error);
        await interaction.followUp({ content: cmdd });
            
    },
};

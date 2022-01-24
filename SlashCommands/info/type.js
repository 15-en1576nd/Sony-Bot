const { Client, CommandInteraction } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageActionRow, MessageButton } = require('discord.js');
const { TV } = require('sony-con-troller')

module.exports = {
    ...new SlashCommandBuilder()
    .setName("type")
    .setDescription("Send some text.")
        .addStringOption(option =>
            option.setName('text')
            .setDescription('Text to send')
            .setRequired(true)),
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
        tv2.backendURL = ""
        const text = interaction.options.getString('text');
        console.log(text, tv2.keyboard)
        await tv2.keyboard.send(text)
        await interaction.followUp({ content: text + ' has been send' });
            
    },
};

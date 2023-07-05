const { SlashCommandBuilder, EmbedBuilder } = require ('discord.js')
const config = require('../../config/config.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('status-rusty')
    .setDescription('Displays status about the Rusty Hearts server'),

    async execute (interaction, client) {

        const { member, user, guild } = interaction

        const players = await fetch(`http://${config.Server_IP_Port}/serverApi/onlineCount`).then((res) => res.json());
        const server = await fetch(`http://${config.Server_IP_Port}/serverApi/gateway/status`).then((res) => res.json());
        const launcher = await fetch(`http://${config.Server_IP_Port}/launcherApi/launcherUpdater/getLauncherVersion`).then((res) => res.json());

        const embed = new EmbedBuilder()
        .setAuthor({ name: "Rusty Hearts Legend", iconURL: guild.iconURL() })
        .setTitle("Server Status")
        .setColor("Random")
        .addFields(
            {
                name: "Status",
                value: `${server.status}`,
                inline: true
            },
            {
                name: "Players Online",
                value: `${players.count}`,
                inline: true
            },
            {
                name: "Launcher Version",
                value: `${launcher.version}`,
                inline: false
            },
        )
        .setFooter({text: user.username, iconURL: member.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .setImage("https://i.ytimg.com/vi/MJFXS5Ddqvk/maxresdefault.jpg")

        interaction.reply({ embeds: [embed]})

    }
}
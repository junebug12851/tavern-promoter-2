/*
 * Copyright 2022 June Hanabi
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * 	http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const _ = require("lodash");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mark-bump-channel')
		.setDescription('Sets this channel to be monitored for bumps')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
		
	async execute(client, app, env, interaction) {

		// Get guild
		const guild = interaction.guild;

		// Get channel
		const channel = interaction.channel;
		const channelId = interaction.channelId;

		// Get guild data
		const data = app.getGuildData(guild);

		// Save Bump chanel
		data.bumpChannel = channel;
		data.bumpChannelID = channelId;

		// Save to disk
		await app.saveSingleGuildData(guild);

		// Reboot bot in this guild
		await app.bootSingle(guild);

		const msgEmbed = new EmbedBuilder()
			.setColor(app.data.embedColor)
			.setDescription(`This is now the bump channel the bot will listen on`)

		await interaction.reply({ embeds: [msgEmbed], ephemeral: true });
	}
};

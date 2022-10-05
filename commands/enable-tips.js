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
		.setName('enable-tips')
		.setDescription('Enables/Disables the tip system under the countdown timer')
		.addBooleanOption(option =>
			option
				.setName('enable')
				.setDescription('Enable or disable tip system')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
		
	async execute(client, app, env, interaction) {

		// Get mentionable
		const enable = interaction.options.getBoolean('enable');

		// Get guild
		const guild = interaction.guild;

		// Get guild data
		const data = app.getGuildData(guild);

		// Save guild data
		data.tipsEnabled = enable;

		// Save to disk
		await app.saveSingleGuildData(guild);

		// Update countdown message to reflect tip setting change
		await app.updateCountdownMessage(guild);

		let msg;

		if(enable)
			msg = `Disboard timer countdown will show changing tips`;
		else
			msg = `Disboard timer countdown will not show any tips`;

		const msgEmbed = new EmbedBuilder()
			.setColor(app.data.embedColor)
			.setDescription(msg);

		await interaction.reply({ embeds: [msgEmbed], ephemeral: true });
	}
};

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
		.setName('enable-simple-bump')
		.setDescription('Enables/Disables replacing the default bump message with a simpler one')
		.addBooleanOption(option =>
			option
				.setName('enable')
				.setDescription('Enable or disable simple bump messages')
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
		data.simpleBumpMessages = enable;

		// Save to disk
		await app.saveSingleGuildData(guild);

		let msg;

		if(enable)
			msg = `Disboard bump messages will now be replaced by something much simpler`;
		else
			msg = `Disboard bump messages will be kept as-is and won't be touched`;

		const msgEmbed = new EmbedBuilder()
			.setColor(app.data.embedColor)
			.setDescription(msg);

		await interaction.reply({ embeds: [msgEmbed], ephemeral: true });
	}
};

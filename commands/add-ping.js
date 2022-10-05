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
		.setName('add-ping')
		.setDescription('Adds a user or role to be pinged, you can repeat this several times')
		.addMentionableOption(option =>
			option
				.setName('to-be-pinged')
				.setDescription('The user or role to be pinged')
				.setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
		
	async execute(client, app, env, interaction) {

		// Get mentionable
		const mentionable = interaction.options.getMentionable('to-be-pinged');
		const pingStr = mentionable.toString();

		// Get guild
		const guild = interaction.guild;

		// Get guild data
		const data = app.getGuildData(guild);

		let msg = "";

		// Prevent duplicate check
		let existsId = data.pingMentions.indexOf(pingStr);

		if(existsId > -1)
			msg = `${pingStr} is already setup to be pinged when it's time to bump next`;
		else {
			// Add mention
			data.pingMentions.push(pingStr);

			// Save to disk
			await app.saveSingleGuildData(guild);

			msg = `${pingStr} has been added to the list of users/roles that will be pinged when it's time to bump next`;
		}

		const msgEmbed = new EmbedBuilder()
			.setColor(app.data.embedColor)
			.setDescription(msg);

		await interaction.reply({ embeds: [msgEmbed], ephemeral: true });
	}
};

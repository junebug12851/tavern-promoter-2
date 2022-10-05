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
		.setName('clear-pings')
		.setDescription('Removes everyone to be pinged')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
		
	async execute(client, app, env, interaction) {
		// Get guild
		const guild = interaction.guild;

		// Get guild data
		const data = app.getGuildData(guild);

		// Remove all mentions
		data.pingMentions.length = 0;

		// Save to disk
		await app.saveSingleGuildData(guild);

		const msgEmbed = new EmbedBuilder()
			.setColor(app.data.embedColor)
			.setDescription(`All people and roles previously setup to be pinged have been cleared, on the next bump ping, nobody will be pinged`);

		await interaction.reply({ embeds: [msgEmbed], ephemeral: true });
	}
};

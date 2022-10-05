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
		.setName('list-pings')
		.setDescription('List the current users/roles to be pinged')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
		
	async execute(client, app, env, interaction) {
		// Get guild
		const guild = interaction.guild;

		// Get guild data
		const data = app.getGuildData(guild);

		// Remove all mentions
		const list = data.pingMentions.join(" ");

		const msgEmbed = new EmbedBuilder()
			.setColor(app.data.embedColor)
			.setDescription(`Users/Roles to be pinged when it's time for the next bump: ${list}`);

		await interaction.reply({ embeds: [msgEmbed], ephemeral: true });
	}
};

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

module.exports = {
	async execute(client, app, env, interaction) {

		// We're only interedted in commands to this bot
		if (!interaction.isChatInputCommand())
			return;

		// Get command file
		const command =
			client.commands.get(interaction.commandName);

		// Ignore if no such file
		if (!command)
			return;

		// Error check
		let cmdError = false;

		// Try to run command and log error if there was one
		try {
			await command.execute(interaction);
		} catch (error) {
			cmdError = error;
		}

		// Stop here if no error
		if(cmdError === false)
			return;

		// Log command error
		console.error(cmdError);

		// Notify user of error and log error if that also fails
		try {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		catch(err) {
			console.error(err);
		}
	},
};

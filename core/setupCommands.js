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

const { Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

module.exports = function(client, app, env) {
	try {
		// Get path to files
		const folderPath = path.join(process.cwd(), env.COMMANDS_FOLDER);
		
		// Prepare array of commands
		client.commands = new Collection();

		// Read all command files
		const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

		// Go through each command file
		for (const file of commandFiles) {

			// Put together path
			const filePath = path.join(folderPath, file);

			// Import command
			const command = require(filePath);

			// Add parameters to command function
			command.execute = command.execute.bind(undefined, client, app, env);

			// Set a new item in the Collection
			// With the key as the command name and the value as the whole command file
			client.commands.set(command.data.name, command);
		}
	}
	catch(err) {
		console.error(err);
	}
}

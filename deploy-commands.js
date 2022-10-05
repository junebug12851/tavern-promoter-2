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

// Imports
const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');

// Initialize Secret Enviroment Variables
require('dotenv').config();

// Ensure executable path is here in this folder
process.chdir(__dirname);

// Get path to commands folder
const commandsPath = path.join(__dirname, process.env.COMMANDS_FOLDER);

// Prepare array of commands
const commands = [];

// Read all command files
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Go through each command file
for (const file of commandFiles) {

	// Put together path
	const filePath = path.join(commandsPath, file);

	// Import command
	const command = require(filePath);

	// Convert command to JSON
	commands.push(command.data.toJSON());
}

async function sendCommands()
{
	// Log bot into Discord API
	const rest = new REST({ version: '10' })
		.setToken(process.env.BOT_TOKEN);

	try
	{
		// Send commands to discord server
		const data = await rest.put(
			Routes.applicationCommands(process.env.BOT_CLIENT_ID),
			{ body: commands }
		);

		// Announce success
		console.log(`Successfully registered ${data.length} application commands.`)
	}
	catch(err)
	{
		console.log(err);
	}
}

sendCommands();

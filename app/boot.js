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

module.exports = async function(client, app, env) {
	try {
		// Update list of guilds
		await app.updateGuildList();

		// Remove disk data to guilods we're not in anymore
		await app.pruneGuildData();

		// Scan for any guilds offline
		app.scanOfflineGuilds();

		// Get all guilds
		const guilds = app.data.guilds;

		// Boot each one individually
		for(let i = 0; i < guilds.length; i++) {
			const guild = guilds[i];
			await app.bootSingle(guild);
		}

		// The bot is completely ready for use
		app.ready = true;

		console.log("Ready!");

		// Here we send the ready signal to PM2
  		process.send('ready');
	}
	catch(err) {
		console.error(err);
	}
}

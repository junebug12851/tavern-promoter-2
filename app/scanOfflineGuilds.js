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

module.exports = function(client, app, env) {

	// Get all guilds the bot is in
	const guilds = app.data.guilds;

	// Loop through them
	for(let i = 0; i < guilds.size; i++) {

		// Get an individual guild
		const guild = guilds.at(i);

		// Stop here if it's online
		if(guild.available)
			continue;

		// Stop here if it's already marked offline
		if(app.data.offlineGuilds.has(guild.id))
			continue;

		console.log(`${guild.name} is now offline...`);

		// Flag it as offline
		app.data.offlineGuilds.set(guild.id, guild);
	}
}

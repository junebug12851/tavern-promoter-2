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

module.exports = function(client, app, env, guild) {
	// Get Guild ID
	const id = guild.id;

	// Get Stored Guild Data
	let guildData = app.data.guildData[id];

	// Make new empty guild data if non-existent
	if(guildData == null) {
		guildData = app.getDefaultGuildData();
		app.data.guildData[id] = guildData;
	}

	// Ensure name is updated to latest name
	guildData.guildName = guild.name;

	// Return guild data
	return guildData;
}

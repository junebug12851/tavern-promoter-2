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

module.exports = async function(client, app, env, guild) {
	try {
		// Do nothing if the guild isn't available
		if(!guild.available)
			return;

		// Get guild data
		const data = app.getGuildData(guild);

		// Stop if bump channel isn't set
		if(data.bumpChannelID == 0)
			return;

		// Get bump channel
		const channel = await guild.channels.fetch(data.bumpChannelID);

		// Save it
		data.bumpChannel = channel;
	}
	catch(err) {
		console.error(err);
	}
}

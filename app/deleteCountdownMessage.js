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
		// Make sure it's available
		if(!guild.available) {
			return false;
		}

		// Get Settings
		const data = app.getGuildData(guild);
		
		// If a countdown message is saved, delete that one
		if(data.countdownMessage != null) {
			await data.countdownMessage.delete();
			data.countdownMessage = null;
			return true;
		}

		// Otherwise try to find it
		const message = await app.getLastCountdownTime(guild);

		// If not found, then we're good
		if(!message)
			return true;

		// Otherwise remove it
		await message.delete();
		data.countdownMessage = null;
		return true;
	}
	catch(err) {
		console.error(err);
	}

	return false;
}

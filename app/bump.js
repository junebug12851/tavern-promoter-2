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
		// Get Settings
		const data = app.getGuildData(guild);

		// Get guild bump times
		await app.getLastBumpTime(guild);

		// Calculate next bump times
		app.setNextBumpTime(guild);

		// Delete countdown messages
		await app.deleteCountdownMessage(guild);

		// Delete ping message
		await app.deletePingMessage(guild);

		// Make new countdown message
		await app.makeCountdownMessage(guild);

		// Remove notification
		data.notified = false;
	}
	catch(err) {
		console.error(err);
	}
}

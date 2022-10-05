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

const moment = require("moment");

module.exports = async function(client, app, env, guild, message) {

	// Make sure it's available
	if(!guild.available) {
		return;
	}

	// Get Settings
	const data = app.getGuildData(guild);

	// Stop here if isn't a disboard bump message
	if(!app.isDisboardBump(message))
		return;

	// Stop here if simple bump messages aren't active
	if(!data.simpleBumpMessages)
		return;

	// Stop here if a bump channel isn't set
	if(data.bumpChannel == null)
		return;

	try {

		// Get user behind message
		const user = message.interaction.user;

		// Remove message
		await message.delete();

		// Replace with simpler one
		await data.bumpChannel.send(`> ${user.toString()} ${env.SIMPLE_BUMP_SUFFIX}`);

		// Return success
		return true;
	}
	catch(err) {
		console.error(err);
	}

	return false;
}

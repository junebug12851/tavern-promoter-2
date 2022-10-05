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

// Does a lot of work to get last bump time, scanning a few past messages
module.exports = async function getLastBumpTime(client, app, env, guild)
{
	try {
		// Make sure it's available
		if(!guild.available) {
			return;
		}

		// Get Settings
		const data = app.getGuildData(guild);

		// Stop here if a bump channel isn't set
		if(data.bumpChannel == null)
			return;

		// Get last messages
		let messages = await data.bumpChannel.messages.fetch({
			limit: Number.parseInt(env.MESSAGE_FETCH_AMOUNT)
		});

		// Selected Bump Message Holder
		let lastMessage = null;

		// Go through them and look for a bump message
		for(let i = 0; i < messages.size; i++) {
			let message = messages.at(i);

			// Stop here if we've found a bump command
			if(app.isMessageBump(message)) {
				lastMessage = message;
				break;
			}
		}

		// Stop here if no bump command was found
		if(lastMessage == null) {
			return false;
		}

		// Get details
		let timestamp = lastMessage.createdTimestamp;

		// Save and return last bump time
		data.lastBumpTime = timestamp;

		return timestamp;
	}
	catch(err) {
		console.error(err);
	}

	return false;
};

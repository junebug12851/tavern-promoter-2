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

		// Stop here if a bump channel isn't set
		if(data.bumpChannel == null)
			return false;

		// Get last messages
		let messages = await data.bumpChannel.messages.fetch({
			limit: Number.parseInt(env.MESSAGE_FETCH_AMOUNT)
		});

		// Selected Countdown Message Holder
		let lastMessage = null;

		// Go through them and look for a countdown message
		for(let i = 0; i < messages.size; i++) {
			let message = messages.at(i);

			// Get details
			let botID = message.author.id;

			// Stop here if we've found a bump command
			if(botID == env.BOT_CLIENT_ID && message.content.startsWith(env.BUMP_MESSAGE_PREFIX)) {
				lastMessage = message;
				break;
			}
		}

		// Stop here if no countdown message was found
		if(lastMessage == null) {
			return false;
		}

		// Save message
		data.countdownMessage = lastMessage;
		return lastMessage;
	}
	catch(err) {
		console.error(err);
	}

	return false;
}

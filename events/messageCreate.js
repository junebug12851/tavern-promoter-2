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

module.exports = {
	async execute(client, app, env, message) {

		try {
			// Ignore any message that isn't a bot
			if (!message.author.bot)
				return;

			// Make sure this is in a guild
			if(!message.inGuild())
				return;

			// Get the guild
			const guild = message.guild;

			// Get guild data
			const data = app.getGuildData(guild);

			// See if a bump channel is set, if not and this is a disboard bump
			// Notify they need to set a disboard bump channel
			if(data.bumpChannel == null) {
				if(app.isMessageBump(message))
					await message.channel.send(
						"You haven't assigned a bump channel for this bot, please use `/mark-bump-channel` on the dedicated Disboard bump channel"
					);

				return;
			}

			// Skip anything other than the bump channel
			if(message.channelId != data.bumpChannel.id)
				return;

			// Do bump if there is a bump from the Disboard Bot
			if(app.isDisboardBump(message)) {

				// Replace with simpler bump message if enabled
				await app.simpleBumpMessage(guild, message);

				// Issue bump
				await app.bump(guild);
			}
		}
		catch(err) {
			console.error(err);
		}
	}
};

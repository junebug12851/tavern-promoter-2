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

const { MessageFlags } = require('discord.js');

module.exports = async function(client, app, env, guild) {
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

		// Create message and account for tips ebing enabled or not
		let msg = {
			content: ``,
			flags: MessageFlags.SuppressEmbeds
		};

		if(!data.tipsEnabled)
			msg.content = `${app.getCountdownContent(guild)}`;
		else
			msg.content = `${app.getCountdownContent(guild)}
${app.getDisboardTip(guild)}`;

		// Make countdown message
		const message = await data.bumpChannel.send(msg);

		// Return success
		data.countdownMessage = message;
		return true;

	}
	catch(err) {
		console.error(err);
	}

	return false;
}

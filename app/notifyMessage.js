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

module.exports = async function(client, app, env, guild) {

	// Make sure it's available
	if(!guild.available) {
		return;
	}

	// Get Settings
	const data = app.getGuildData(guild);

	// Stop here if a bump channel isn't set
	if(data.bumpChannel == null)
		return;

	// Refuse to notify if already notified
	if(data.notified)
		return true;

	// Stop here if not time to notify users
	const curTime = moment().valueOf();
	if(curTime < data.nextBumpTime)
		return;

	try {
		// Make new ping message
		// Don't bother if nobody is setup to be pinged
		if(data.pingMentions.length > 0)
			await data.bumpChannel.send(`${env.NOTIFY_MESSAGE_PREFIX} ${data.pingMentions.join(" ")}`);
		else
			await data.bumpChannel.send(`${env.NOTIFY_MESSAGE_PREFIX} Nobody is setup to be pinged, use \`/addping\` to add people or roles to be pinged when it's time to bump`);

		// Mark notified
		data.notified = true;

		// Return success
		return true;
	}
	catch(err) {
		console.error(err);
	}

	return false;
}

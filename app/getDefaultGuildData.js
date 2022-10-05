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

module.exports = function(client, app, env) {
	return {
		// Last bump time
		lastBumpTime: 0,

		// Next bump time
		nextBumpTime: 0,

		// Message object pointing to countdown message
		countdownMessage: null,

		// Whether the notification message has been sent or not
		notified: false,

		// The channel object to work within
		bumpChannel: null,

		// The channel ID to work within
		bumpChannelID: 0,

		// The name of the guild
		guildName: null,

		// Users/Roles to ping
		pingMentions: [],

		// Whether or not to use simple bump messages
		simpleBumpMessages: false,

		// Changing help index for the countdown timer help message
		helpIndex: 0,

		// Whether tips are enabled or not
		tipsEnabled: true,
	};
}

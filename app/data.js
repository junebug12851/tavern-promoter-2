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

const { Collection } = require('discord.js');

// Holds In-Memory Data
module.exports = {

	// Guild data for the different guilds
	guildData: {},

	// Guilds the bot is in
	guilds: new Collection(),

	// Guilds which are offline
	// They need to be monitored as when they are back online they need to
	// go through the boot process again
	offlineGuilds: new Collection(),

	// Whether the bot is completely ready for usage or not
	ready: false,

	// Embed color of bot messages
	embedColor: Number.parseInt(process.env.EMBED_COLOR, 16),
};

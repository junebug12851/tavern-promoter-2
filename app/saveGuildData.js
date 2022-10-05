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

const _ = require("lodash");
const fsPromise = require('node:fs/promises');
const path = require('node:path');

module.exports = async function(client, app, env) {
	try {
		// Get Data for all guilds
		const guildData = app.data.guildData;

		// Get storage path
		const storagePath = path.join(process.cwd(), env.STORAGE_FOLDER);

		// Loop through all guild data
		_.forOwn(guildData, async function(val, key) {
			return fsPromise.writeFile(
				path.join(storagePath, `${key}.json`),
				JSON.stringify({
					version: 1,
					bumpChannelID: val.bumpChannelID,
					guildName: val.guildName,
					pingMentions: val.pingMentions,
					simpleBumpMessages: val.simpleBumpMessages,
					tipsEnabled: val.tipsEnabled,
				}, null, 4)
			);
		});
	}
	catch(err) {
		console.error(err);
	}
}

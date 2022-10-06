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

const fs = require('node:fs');
const _ = require("lodash");
const path = require('node:path');

module.exports = function(client, app, env) {
	try {
		// Get all guilds
		const guilds = app.data.guilds;

		// Load each one individually
		for(let i = 0; i < guilds.length; i++) {
			const guild = guilds[i];
			await app.loadSingleGuildData(guild);
		}
	}
	catch(err) {
		console.error(err);
	}
}

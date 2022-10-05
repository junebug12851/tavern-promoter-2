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
		// Get storage path
		const folderPath = path.join(process.cwd(), env.STORAGE_FOLDER);

		// Read all app files
		const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.json'));

		// Go through each guild data file
		for (let i = 0; i < files.length; i++) {

			const fileStr = files[i];

			// Put together path
			const filePath = path.join(folderPath, fileStr);

			// Import file
			const file = require(filePath);

			// Get filename without extension
			const fileName = path.parse(fileStr).name;

			// Get guild associated with this file
			const guild = app.data.guilds.get(fileName);

			// Skip if no guild is associated
			if(guild == undefined)
				continue;

			// Get guild data
			const data = app.getGuildData(guild);

			// copy saved data in
			_.assign(data, file);
		}
	}
	catch(err) {
		console.error(err);
	}
}

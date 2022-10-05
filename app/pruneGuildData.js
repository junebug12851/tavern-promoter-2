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

const fsPromise = require('node:fs/promises');
const _ = require("lodash");
const path = require('node:path');

module.exports = async function(client, app, env) {
	try {
		// Get storage path
		const folderPath = path.join(process.cwd(), env.STORAGE_FOLDER);

		// Read all app files
		let files = await fsPromise.readdir(folderPath);
		files = files.filter(file => file.endsWith('.json'));

		// Go through each guild data file
		for (const file of files) {

			// Put together path
			const filePath = path.join(folderPath, file);

			// Get filename without extension
			const fileName = path.parse(file).name;

			// Get guild associated with this file
			const guild = app.data.guilds.get(fileName);

			// If the data file matches a guild we're in, then skip
			if(guild != undefined)
				continue;

			// This means we have a data file to a guild we're not in anymore
			// Remove it from disk
			await fsPromise.rm(filePath, {
				force: true
			});
		}
	}
	catch(err) {
		console.error(err);
	}
}

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
const path = require('node:path');

module.exports = function(client, app, env) {
	try {
		// Get path to files
		const folderPath = path.join(process.cwd(), env.EVENTS_FOLDER);
		
		// Read all event files
		const eventFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

		// Go through each event file
		for (const file of eventFiles) {

			// Put together path
			const filePath = path.join(folderPath, file);

			// Import event
			const event = require(filePath);

			// Get filename without extension
			const fileName = path.parse(file).name;

			// Bind event function
			const eventFunc = event.execute.bind(undefined, client, app, env);

			// Register it depending on if it's once or repeat
			if (event.once) {
				client.once(fileName, eventFunc);
			} else {
				client.on(fileName, eventFunc);
			}
		}
	}
	catch(err) {
		console.error(err);
	}
}

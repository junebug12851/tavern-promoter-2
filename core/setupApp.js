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
		// Get path to files
		const folderPath = path.join(process.cwd(), env.APP_FOLDER);

		// Read all app files
		const appFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

		// Go through each command file
		for (const file of appFiles) {

			// Put together path
			const filePath = path.join(folderPath, file);

			// Import app
			const appFile = require(filePath);

			// Get filename without extension
			const fileName = path.parse(file).name;

			// Save it into the app object, if it's a function then save it in a
			// way where it retains references to the app and client
			if(_.isPlainObject(appFile))
				app[fileName] = appFile;
			else
				app[fileName] = appFile.bind(undefined, client, app, env);
		}
	}
	catch(err) {
		console.error(err);
	}
}

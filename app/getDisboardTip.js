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

module.exports = function(client, app, env, guild) {

	// Get Settings
	const data = app.getGuildData(guild);

	// Save current index
	const helpIndex = data.helpIndex;

	// Increment index and ensure not over max
	data.helpIndex++;

	if(data.helpIndex > 5)
		data.helpIndex = 0;

	// Return the next message in-line
	switch(data.helpIndex) {
		case 0:
			return `\`/bump\` ranks this server up so it can get more popular`;
		case 1:
			return `You can use \`/bump\` as much as every two hours to keep the server as high rank as possible`;
		case 2:
			return `Visit https://disboard.org to find other servers or list your own server`;
		case 3:
			return `Check out this servers listing page at https://disboard.org/server/${guild.id}`;
		case 4:
			return `Your welcome to leave a review for this server at https://disboard.org/review/create/${guild.id}`;
		case 5:
			return `You can view the current reviews for this server at https://disboard.org/server/reviews/${guild.id}`;

	}

	// Error, not supposed to be here
	return ``;
}

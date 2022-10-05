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

module.exports = function(client, app, env, message) {

	// Stop if not disboard bot
	if(message.author.id != env.DISBOARD_BOT_ID)
		return false;

	// Get Command
	let botCommand = message.interaction.commandName;

	// If bump command, we're good
	if(botCommand == env.DISBOARD_BUMP_COMMAND)
		return true;

	// Ignore as not bump command
	return false;
}

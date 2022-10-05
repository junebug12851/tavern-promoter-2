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

let tickTimerFunc;

// Tick every so often, only after the function fully completes
async function tickTimer(client, app, env) {

	try {
		if(app.ready == true)
			await app.tick();
	}
	catch(err) {
		console.error(err);
	}

	setTimeout(tickTimerFunc, env.TICK_FREQ * 1000);
}

module.exports = function(client, app, env) {
	tickTimerFunc = tickTimer.bind(undefined, client, app, env);
	setTimeout(tickTimerFunc, env.TICK_FREQ * 1000);
}

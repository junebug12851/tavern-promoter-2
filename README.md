![image](https://user-images.githubusercontent.com/1305564/194155718-97511aac-3e3a-4a2b-acc4-8d71fcdf64b0.png)

## Tavern Promoter 2
*A Discord bot*

### What is this?

This is a simple discord bot written in NodeJS/Javascript, it looks at the Disboard bot last bump time and gives a relative countdown to the next bump. When it comes time to bump, it pings one or more users/roles. It intentionally doesn't offer a lot of features nor a lot of customization. It's meant to be very simple.

### What does it offer as a bump reminder bot?

**Relative Time**

Time isn't given to you in a countdown clock, it's given to you in relative terms

* `Next bump in an hour`
* `Next bump in 23 minutes`
* `Next bump 2 hours ago`

**Optional Tips**

![image](https://user-images.githubusercontent.com/1305564/194155930-097a7111-4c33-477e-979c-bd26cc93f583.png)

Enabled by default. Every so often, a Disboard tip will cycle through below the countdown. You'll see messages like

* Letting users new to bumping or Disboard know they can `/bump`
* Giving a link to your listing page, your review page, even an easy link for them to leave a review
* Other tips...

These tips give the user information in a very elegant and simple way, something I feel the Disboard bot bump messages fail at.

**Optional Alternative Disboard Bump Notifications**

![image](https://user-images.githubusercontent.com/1305564/194156240-74960b91-727a-4535-a759-aaadd176a87e.png)

Disabled by default. For people who get tired of seeing the same large Disboard bump message with the same large image at bottom and the weird profile image next to it. This offers a simpler approach:

* It removes the Disboard bump message
* It replaces it with one from this bot
* The one from this bot is just a simple one-line message that says who bumped, nothing fancy

Some may not like it, but for those who prefer something more minimalistic and not overly large and crowded this works nicely and it pairs very well with the tip system which takes what the disboard bump notification was trying to do, but does it better.

**Cleanup**

The bot auto-deletes old messages before posting new ones to keep the channel tidy and un-cluttered.

* Bump Notification messages are deleted on a new bump since their no longer relevant
* Old countdown messages are also removed on a bump since their no longer relevant

The bot keeps the bump notifications though so you can look through the chat history and see bump activity/history, this includes the replacement bump notications if you use that instead.

### What does it require?

The bot requires:

* A dedicated disboard channel
* A disboard channel that already has at least 1 bump on it
* A disboard channel that has no other usage, no other chat history or commands or bot stuff happening in it, strictly only bumps

### How do I use the bot?

As an administrator:

1. Invite the bot to your server
2. Enter the dedicated disboard bump channel that is only used for bumping and already has at least 1 bump on it
3. Run the command `/mark-bump-channel`
4. Then add at least 1 ping user or role with `/add-ping <user or role>`

Your done, it'll just work passively in the background now

### What about the other stuff the bot can do?

* `/add-ping`, `/clear-pings`, `/remove-ping`, and `/list-pings` will let you work on which users and/or roles the bot pings when it's tiem to bump
* `/enable-simple-bump` lets you enable or disable alternative bump notifications, replacing the default Disboard ones
* `/enable-tips` lets you enable or disable the tip system, showing helpful tips on Disboard and your server's disboard listing

### What is this licensed?

Apache 2, basically do whatever you want with the code, just make sure to credit me back as original creator, and don't blame me for anything.
See LICENSE.md for all the gritty legal details.

### Can I contribute?

Yes, basically fork the project, make changes, and send a pull request. There's help online if you need help with that and for further questions look into CONTRIBUTING.md

### I have an issue/request/suggestion

You may open an issue in the issue tracker for any of those, including requests/suggestions. But I'm very busy in real life and I cannot guaretee I can get to them in a timely manner, it could sit there for a while. Contributions from others are always welcome for that reason.

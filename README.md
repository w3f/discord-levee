[![CircleCI](https://circleci.com/gh/w3f/discord-levee.svg?style=svg)](https://circleci.com/gh/w3f/discord-levee)

# Discord Levee

A simple site to create unique one time use invites for discord.

## How to Run

### Locally
```sh
deno task start
```

### Docker
```sh
docker build -t app . && docker run -it --init -p 8000:8000 app
```

### Environment variables

The following environment variables must be set:

* H_SECRET
  * Server captcha secret for [hCaptcha](https://www.hcaptcha.com/)
* SITE_KEY
  * Client side site key for [hCaptcha](https://www.hcaptcha.com/)
* CHANNEL_ID
  * Discord channel ID for invite
* DISCORD_SECRET
  * Discord bot secret to create the invite
* SERVER_NAME
  * Name of the Discord server
* SERVER_DESC
  * Description of the Discord Server
* BACKGROUND_IMG
  * Custom invite screen background

## Setup Notes

For this tool to be affective make sure that users of the servers can not create their own invites and only admins/the bot you created has access to invite creation.

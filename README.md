# ACEBOT

# Setup
- Clone the repository, or download the ZIP file by clicking the green "Code" button
- Open a CMD prompt and write `npm install`
- Open config.json and change all the values to fit your client/server

# Default Configurations
### Client variables are stored in ```config.json``` & Color variables are stored in ```utils/colors.json```
- `token`: Your discord client's token, can be found in the discord developer portal
- `prefix`: Goes before every command, it can be almost anything, but choose something easy
- `presence`: Changes your client's status (ex. https://i.imgur.com/yDFrNIH.png)
- `owners`: An array where you can add multiple IDs to access ownerOnly commands
- `logchannel`: An ID for a channel in your discord server to send all event logs to
- `alertchannel`: An ID for a channel in your disocrd server to send alerts to

# Configuration for a XenForo forum
### If you don't have a XenForo forum license or you don't want to have the commands at all you can skip this completely! Just be sure to remove the "forum" directory from the commands folder.
- Go to your XenForo Admin Control Panel
- Click the "Setup" dropdown
- Click "API Keys" 
- Create a new API Key with Super User Key Type selected and give it a title
- Go to `config.json`
- Add your API key to the "api_key" field
- Add your **Forum**'s URL to the "url" field and add `?api` at the end of your URL (ex. https://i.imgur.com/Luo3deZ.png)
- `CTRL + Shift + S` in an editor and replace all "example.com" links

# Command Requests
- I will make any command so long as it's reasonable for free, just open a issue and I'll get you an ETA on when it will be added

# Server
https://discord.gg/ZhVbQE9Tp2

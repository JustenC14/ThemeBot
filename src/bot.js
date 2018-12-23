/* eslint-disable no-await-in-loop, no-unused-vars */
const Discord = require('discord.js');
// Local files
const discordAuth = require('./secrets/discordAuth');
const playlistGenerator = require('./commands/generate');

let videosList;

// Initialize Discord Bot
const bot = new Discord.Client();
bot.login(discordAuth.token);

// Called when bot launches
bot.on('ready', (evt) => {
  console.log('bot online and ready...');
});

// Called whenever a message is sent in a text channel
bot.on('message', async (message) => {
  const userID = message.author.id;
  const discordVoiceChannel = message.member.voiceChannel;

  // if ! entered before a word, begin executing a command
  if (message.content.substring(0, 1) === '!') {
    // Split the message into an array of single words, then split the command and arguments up.
    let args = message.content.substring(1).split(' ');
    const cmd = args[0];
    args = args.splice(1);

    console.log(`Command: ${cmd}, Args: ${args}`);

    /**
     * Switch statement that handles all bot command logic.
     * @param {string}  cmd String that represents the command user wants to execute
     * @returns {none}
     */
    switch (cmd) {
      // !generate <tags>
      case 'generate':
        // Check that the user entered tags
        if (args.length > 0) {
          console.log('generate playlist command entered...');
          playlistGenerator.generatePlaylist(message, args);
        } else { // Display informational message if the user failed to add tags
          message.channel.send('```diff\nIn order to make a playlist'
            + ' you need to add tags!\n```!generate <tag> <tag>...\n```');
        }
        break;
      // !play or !play <id>
      case 'play':
        console.log('!play feature coming soon!');
        break;
      // !next
      case 'next':
        console.log('!next feature coming soon!');
        break;
      // !stop
      case 'stop':
        console.log('!stop feature coming soon!');
        break;
      // !history
      case 'history':
        console.log('!history feature coming soon!');
        break;
      // !replay <id>
      case 'replay':
        console.log('!replay feature coming soon!');
        break;
      // In case an invalid command was placed
      default:
        console.log(`invalid command !${cmd} entered!`);
    }
  }
});

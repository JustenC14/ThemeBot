/* eslint-disable no-await-in-loop, no-unused-vars */
const Discord = require('discord.js');
// Local files
const discordAuth = require('./secrets/discordAuth');
const playlistGenerator = require('./commands/generate');

let videosList;

// Initialize Discord Bot
const bot = new Discord.Client();
bot.login(discordAuth.token);

// Display information about bot on launch
bot.on('ready', (evt) => {
  // logger.info('Connected');
  // logger.info('Logged in as: ');
  // logger.info(`${bot.username} - (${bot.id})`);
});

bot.on('message', async (message) => {
  // console.log(message);
  const userID = message.author.id;
  const discordVoiceChannel = message.member.voiceChannel;
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with '!'
  if (message.content.substring(0, 1) === '!') {
    let args = message.content.substring(1).split(' ');
    const cmd = args[0];
    args = args.splice(1);
    console.log(`Command: ${cmd}, Args: ${args}`);

    switch (cmd) {
      // !play <tags>
      case 'generate':
        if (args.length > 0) {
          console.log('generate playlist command entered...');
          playlistGenerator.generatePlaylist(message, args);
        } else {
          message.channel.send('*In order to make a playlist'
            + ' you need to add tags!*\n**!generate <tag> <tag>...**');
        }
        break;
      case 'play':
        console.log('not yet');
        break;
      case 'next':
        console.log('not yet');
        break;
      case 'stop':
        console.log('not yet');
        break;
      case 'history':
        console.log('not yet');
        break;
      case 'replay':
        console.log('not yet');
        break;


      default:
        console.log(`invalid command ${cmd} entered...`);
    }
  }
});

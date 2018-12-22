/* eslint-disable no-await-in-loop, no-unused-vars */
const Discord = require('discord.js');
const YoutubeDL = require('youtube-mp3-downloader');
const fs = require('fs');
const logger = require('winston');
const { google } = require('googleapis');
const { promisify } = require('util');
// Local files
const discordAuth = require('./auth.json');
const ytAuth = require('./youtube_auth');
const simpleYT = require('./simpleYT_auth');

let videosList;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// function ytSearch(auth, args) {
//   const service = google.youtube('v3');
//   let queryString = '';
//   console.log(args, 'Num Elements: ', args.length);
//   for (let i = 0; i < args.length; i += 1) {
//     queryString += args[i];
//     if (i !== args.length - 1) queryString += '+';
//   }

//   console.log('Recieved and created query: %s', queryString);

//   service.search.list({
//     auth,
//     maxResults: '1',
//     part: 'snippet',
//     type: 'video',
//     videoCategoryId: '10',
//     q: queryString,

//   }, (err, response) => {
//     if (err) {
//       console.log(`The API returned an error: ${err}`);
//       return;
//     }
//     const videos = response.data.items;
//     if (videos.length === 0) {
//       console.log('No videos found.');
//     } else {
//       videosList = videos.map(video => video.id.videoId);
//     }
//   });
// }

async function ytPlay(args, voiceChannel) {
  // First get the list of videos based on the tag
  console.log('Looking to authenticate and search.');
  const videos = await simpleYT.search(args);
  console.log(videos);

  // Configure YoutubeMp3Downloader with your settings
  const YD = new YoutubeDL({
    ffmpegPath: '/usr/bin/ffmpeg', // Where is the FFmpeg binary located?
    outputPath: './buffer', // Where should the downloaded and encoded files be stored?
    youtubeVideoQuality: 'highest', // What video quality should be used?
    queueParallelism: 2, // How many parallel downloads/encodes should be started?
    progressTimeout: 2000, // How long should be the interval of the progress reports
  });

  videos.forEach((video) => {
    YD.download(video);
  });
  // Download video and save as MP3 file
  // YD.download('Vhd6Kc4TZls');

  YD.on('finished', (err, data) => {
    console.log(JSON.stringify(data));
    console.log('Audio download complete.');

    const channel = bot.channels.find('name', 'General');

    channel.join()
      .then((connection) => {
        console.log('Connected');
        const dispatcher = connection.playFile('./buffer/Luis Fonsi - Despacito ft. Daddy Yankee.mp3');
        dispatcher.on('end', (end) => {
          console.log('song finished.');
          channel.leave();
        });
      })
      .catch(console.error);
    // voiceChannel.join()
    //   .then(connection => console.log('Connected!'))
    //   .catch(console.error);
  });

  YD.on('error', (error) => {
    console.log(error);
  });

  YD.on('progress', (progress) => {
    console.log(`Current Download Progress: ${progress.progress.percentage.toFixed(2)}%`);
  });
}

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
  colorize: true,
});
logger.level = 'debug';

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
      // !ping
      case 'ping':
        message.channel.send('pong');
        break;

      // !play <tags>
      case 'play':
        if (args.length > 0) {
          console.log('About to play.');
          ytPlay(args, discordVoiceChannel);
        } else {
          message.channel.send('*In order to make a playlist'
            + ' you need to add tags!*\n!play <tag> <tag>...');
        }
        break;

      default:
        console.log('uh oh');
    }
  }
});

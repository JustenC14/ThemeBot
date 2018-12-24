const fs = require('fs');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const youtubeTools = require('../helpers/youtubeTools');
const utils = require('../helpers/utils');

const methods = {};

/**
 * Generate a playlist of youtube videos from user keywords
 * @param {Object} message Discord message
 * @param {Array} args Array of keyword arguments
 * @returns {Promise}
 */
methods.generatePlaylist = async (message, args) => {
  console.log('generating playlist...');
  // First get the list of videos based on the tag
  console.log('Looking to authenticate and search.');
  const videos = await youtubeTools.search(args);
  const videosInfo = await youtubeTools.getVideosInfo(videos);

  const playlist = {};
  const richMessage = new Discord.RichEmbed();

  richMessage.setAuthor(message.author.username, message.author.avatar);
  richMessage.setTitle('Here is a playlist we generated from your tags:');
  richMessage.setFooter('Playlist Generated');
  richMessage.setTimestamp();

  let counter = 1;
  videosInfo.forEach((video) => {
    richMessage.addField(`${counter}: ${video.title} - ${utils.formatTime(video.duration.hours)}:${utils.formatTime(video.duration.minutes)}:${utils.formatTime(video.duration.seconds)}`,
      `https://youtube.com/watch?v=${video.id}`);
    playlist[counter] = {};
    playlist[counter].title = video.title;
    playlist[counter].id = video.id;
    playlist[counter].hours = video.duration.hours;
    playlist[counter].minutes = video.duration.minutes;
    playlist[counter].seconds = video.duration.seconds;
    counter += 1;
  });

  message.channel.send({ richMessage });

  // let messageString = '```xl\n';
  // let counter = 1;

  // // Generate the message of the generated playlist and prepare the object for JSON storage
  // videosInfo.forEach((video) => {
  //   console.log(video);
  //   messageString += `${counter}: '${video.title}' - `;
  //   messageString += `[${utils.formatTime(video.duration.hours)}:${utils.formatTime(video.duration.minutes)}:${utils.formatTime(video.duration.seconds)}]`;
  //   messageString += ` https://youtube.com/watch?v=${video.id}\n`;
  //   playlist[counter] = {};
  //   playlist[counter].title = video.title;
  //   playlist[counter].id = video.id;
  //   playlist[counter].hours = video.duration.hours;
  //   playlist[counter].minutes = video.duration.minutes;
  //   playlist[counter].seconds = video.duration.seconds;
  //   counter += 1;
  // });
  // messageString += '```';

  // // Send the message and store the playlist object in generatedPlaylist.json in buffer
  // message.channel.send(messageString);

  fs.writeFileSync('../buffer/generatedPlaylist.json', JSON.stringify(playlist));

  const streamOptions = { seek: 0, volume: 1 };
  const discordVoiceChannel = message.member.voiceChannel;
  discordVoiceChannel.join().then((connection) => {
    console.log('joined channel');
    const stream = ytdl('https://www.youtube.com/watch?v=gOMhN-hfMtY', { filter: 'audioonly' });
    const dispatcher = connection.playStream(stream, streamOptions);
    dispatcher.on('end', (end) => {
      console.log('left channel ', end);
      discordVoiceChannel.leave();
    });
    connection.on('error', (err) => {
      console.log('err : ', err);
    });
    connection.on('disconnected', (err) => {
      console.log('err : ', err);
    });
  }).catch(err => console.log(err));

  // console.log(videos);
  // console.log(videos[0].raw.snippet);

  // Configure YoutubeMp3Downloader with your settings
  // const YD = new YoutubeDL({
  //   ffmpegPath: '/usr/bin/ffmpeg', // Where is the FFmpeg binary located?
  //   outputPath: './buffer', // Where should the downloaded and encoded files be stored?
  //   youtubeVideoQuality: 'highest', // What video quality should be used?
  //   queueParallelism: 2, // How many parallel downloads/encodes should be started?
  //   progressTimeout: 2000, // How long should be the interval of the progress reports
  // });

  // videos.forEach((video) => {
  //   YD.download(video);
  // });
  // // Download video and save as MP3 file
  // // YD.download('Vhd6Kc4TZls');

  // YD.on('finished', (err, data) => {
  //   console.log(JSON.stringify(data));
  //   console.log('Audio download complete.');

  //   const channel = bot.channels.find('name', 'General');

  //   channel.join()
  //     .then((connection) => {
  //       console.log('Connected');
  //       const dispatcher = connection.playFile('./buffer/Luis Fonsi - Despacito ft. Daddy Yankee.mp3');
  //       dispatcher.on('end', (end) => {
  //         console.log('song finished.');
  //         channel.leave();
  //       });
  //     })
  //     .catch(console.error);
  //   // voiceChannel.join()
  //   //   .then(connection => console.log('Connected!'))
  //   //   .catch(console.error);
  // });

  // YD.on('error', (error) => {
  //   console.log(error);
  // });

  // YD.on('progress', (progress) => {
  //   console.log(`Current Download Progress: ${progress.progress.percentage.toFixed(2)}%`);
  // });
};

module.exports = methods;

const youtubeTools = require('../helpers/youtubeTools');

const methods = {};

methods.generatePlaylist = async (bot, args) => {
  console.log('generating playlist...');
  // First get the list of videos based on the tag
  console.log('Looking to authenticate and search.');
  const videos = await youtubeTools.search(args);
  const videosInfo = await youtubeTools.getVideosInfo(videos);
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

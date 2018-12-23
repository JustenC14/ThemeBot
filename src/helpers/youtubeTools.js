/* eslint-disable no-restricted-syntax, no-await-in-loop */
const Youtube = require('simple-youtube-api');
const youtubeAuth = require('../secrets/youtubeAuth');

const youtube = new Youtube(youtubeAuth.token);

const methods = {};
const NUM_RESULTS = 3;

methods.search = async (args) => {
  console.log(args);

  let queryString = '';
  console.log(args, 'Num Elements: ', args.length);
  for (let i = 0; i < args.length; i += 1) {
    queryString += args[i];
    if (i !== args.length - 1) queryString += '+';
  }
  queryString += '+music';

  const results = await youtube.search(queryString, NUM_RESULTS, { type: 'video' });

  // console.log(results);
  return results.map(result => result.id);
};

/**
 * Get information about videos from a provided video ID list.
 * @param {Array} idList List of youtube video IDs.
 * @returns {Array} videosInfo List of information about the provided youtube video IDs.
 */
methods.getVideosInfo = async (idList) => {
  const videosInfo = [];

  for (const id of idList) {
    const info = await youtube.getVideoByID(id);
    videosInfo.push(info);
  }

  console.log(videosInfo);
  return videosInfo;
};

module.exports = methods;

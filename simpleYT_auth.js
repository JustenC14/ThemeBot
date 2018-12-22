const Youtube = require('simple-youtube-api');
const youtubeAuth = require('./youtube.json');

const youtube = new Youtube(youtubeAuth.token);

const methods = {};
const NUM_RESULTS = 1;

methods.search = async (args) => {
  console.log(args);

  let queryString = '';
  console.log(args, 'Num Elements: ', args.length);
  for (let i = 0; i < args.length; i += 1) {
    queryString += args[i];
    if (i !== args.length - 1) queryString += '+';
  }
  queryString += '+music';

  const results = await youtube.search(queryString, NUM_RESULTS);
  // console.log(results);
  return results.map(result => result.id);
};

module.exports = methods;

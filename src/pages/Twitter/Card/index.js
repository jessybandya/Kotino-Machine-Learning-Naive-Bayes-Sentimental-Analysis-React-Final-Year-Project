// twitterClient.js
const Twit = require('twit');

const twitterClient = new Twit({
  consumer_key: 'YOUR_TWITTER_CONSUMER_KEY',
  consumer_secret: 'YOUR_TWITTER_CONSUMER_SECRET',
  access_token: 'YOUR_TWITTER_ACCESS_TOKEN',
  access_token_secret: 'YOUR_TWITTER_ACCESS_TOKEN_SECRET',
  timeout_ms: 60 * 1000, // Optional: Set a timeout for API requests
});

module.exports = twitterClient;

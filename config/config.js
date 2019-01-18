'use strict';

module.exports = {
    "bnet":{
        "apikey":process.env.BNET_APIKEY,
        "key":process.env.BNET_KEY,
        "secret":process.env.BNET_SECRET,
        "region":"eu"
    },
    "tumblr":{
        "consumer_key":process.env.TUMBLR_CONSUMER_KEY,
        "consumer_secret":process.env.TUMBLR_CONSUMER_SECRET,
        "token":process.env.TUMBLR_TOKEN,
        "token_secret":process.env.TUMBLR_TOKEN_SECRET
    }
};

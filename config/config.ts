export interface Config {
  bnet: {
    id: string;
    secret: string;
    region: string;
  };
  tumblr: {
    consumer_key: string;
    consumer_secret: string;
    token: string;
    token_secret: string;
  };
}
export const config = {
  bnet: {
    id: process.env.BNET_ID,
    secret: process.env.BNET_SECRET,
    region: 'eu',
  },
  tumblr: {
    consumer_key: process.env.TUMBLR_CONSUMER_KEY,
    consumer_secret: process.env.TUMBLR_CONSUMER_SECRET,
    token: process.env.TUMBLR_TOKEN,
    token_secret: process.env.TUMBLR_TOKEN_SECRET,
  },
};

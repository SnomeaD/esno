import { config } from '../config/config.js';
const constRegion = 'eu';
const blizzard = require('blizzard.js').initialize({
  key: config.bnet.id,
  secret: config.bnet.secret,
  origin: constRegion,
});
import axios from 'axios';
import { response } from 'express';

export const getToonController = (req, res, next) => {
  console.log('getToonController');

  function getTokenAccess(token: string) {
    console.log('getTokenAccess');
    return axios
      .get(`https://${constRegion}.battle.net/oauth/token`, {
        params: {
          code: token,
          grant_type: 'authorization_code',
          scope: 'wow.profile',
          redirect_uri: 'http://localhost:4200/auth/bnet/callback',
        },
        auth: { username: config.bnet.id, password: config.bnet.secret },
      })
      .then((tokenResponse) => {
        console.log(tokenResponse);
        return token;
      })
      .catch((error) => {
        console.log(error);
        return token;
      });
  }

  const configOrigin = config.bnet.region;
  const configRealm = req.params.server;
  const configName = req.params.name;
  const token = 'EUiwfIMS0BXAlbo4fqqjoaTG4NvY6hjIPk';
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };
  axios
    .get(
      `https://${constRegion}.api.blizzard.com/profile/user/wow?namespace=profile-eu&locale=en_GB&access_token=${token}`,
      axiosConfig
    )
    .then((axiosResponse) => {
      console.log(axiosResponse?.data?.wow_accounts);
      return axiosResponse?.data?.wow_accounts;
    })
    .catch((error) => {
      console.log(error);
      return 'perdu';
    });
  // getTokenAccess('EUiwfIMS0BXAlbo4fqqjoaTG4NvY6hjIPk').then((accessToken) => {
  //   console.log('accessToken', accessToken);
  //   if (accessToken !== 'perdu') {
  //     blizzard.account.userInfo(accessToken).then((userInfoResponse) => {
  //       console.log(userInfoResponse);
  //     });
  //   }
  //   return false;
  // });
  console.log('fini');
};

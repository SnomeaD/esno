import { config } from '../config/config.js';
const constRegion = 'eu';
const blizzard = require('blizzard.js').initialize({
  key: config.bnet.id,
  secret: config.bnet.secret,
  origin: constRegion,
});
import axios from 'axios';
import { ToonDetails } from 'src/app/toonDetails.js';
const PLAYABLE_CLASS = 'playable_class';
const PLAYABLE_RACE = 'playable_race';
const PROTECTED_CHARACTER = 'protected_character';

const extractData = (rawData: any): ToonDetails => {
  console.log(rawData);
  return null;
};
export const getToonController = (req: any, res: any) => {
  console.log('getToonController');

  const token = req.session?.passport?.user?.token;
  const realmSlug = req.params?.realmSlug;
  const toonName = req.params?.toonName;

  if (token && realmSlug && toonName) {
    const url = `https://${constRegion}.api.blizzard.com/profile/wow/character/${realmSlug}/${toonName}/achievements/statistics?namespace=profile-${constRegion}&locale=en_GB&access_token=${token}`;
    const axiosConfig = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(url, axiosConfig)
      .then((axiosResponse) => {
        res.jsonp(extractData(axiosResponse?.data));
      })
      .catch((error) => {
        res.status(500).jsonp({ status: 500, message: error });
      });
  } else {
    res.status(500).jsonp({
      status: 500,
      message: `missing value: token: ${token}, realmSlug: ${realmSlug}, toonName: ${toonName}`,
    });
  }
};

import { config } from '../config/config.js';
const constRegion = 'eu';
const blizzard = require('blizzard.js').initialize({
  key: config.bnet.id,
  secret: config.bnet.secret,
  origin: constRegion,
});
import axios from 'axios';
import { Toon, MAX_LEVEL } from 'src/app/toon.js';
const PLAYABLE_CLASS = 'playable_class';
const PLAYABLE_RACE = 'playable_race';
const PROTECTED_CHARACTER = 'protected_character';

const extractData = (rawData: any): Toon[] => {
  const toons: Toon[] = [];
  rawData.forEach((element: any) => {
    element.characters.forEach((char: any) => {
      if (char.level >= MAX_LEVEL - 9) {
        toons.push({
          name: char.name,
          id: char.id,
          realm: {
            name: char.realm.name,
            slug: char.realm.slug,
            id: char.realm.id,
          },
          class: {
            name: char[PLAYABLE_CLASS].name,
            id: char[PLAYABLE_CLASS].id,
          },
          race: {
            name: char[PLAYABLE_RACE].name,
            id: char[PLAYABLE_RACE].id,
          },
          gender: {
            type: char.gender.type,
            name: char.gender.name,
          },
          faction: {
            type: char.faction.type,
            name: char.faction.name,
          },
          protectedUrl: char[PROTECTED_CHARACTER].href,
          level: char.level,
        });
      }
    });
  });
  return toons;
};
export const getToonsController = (req: any, res: any) => {
  const token = req.session?.passport?.user?.token;
  if (token) {
    const axiosConfig = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(
        `https://${constRegion}.api.blizzard.com/profile/user/wow?namespace=profile-${constRegion}&locale=en_GB&access_token=${token}`,
        axiosConfig
      )
      .then((axiosResponse) => {
        res.jsonp(extractData(axiosResponse?.data?.wow_accounts));
      })
      .catch((error) => {
        console.log(error);
        res.status(500).jsonp({ status: 500, message: error });
      });
  } else {
    res.status(500).jsonp({ status: 500, message: 'no token' });
  }
};

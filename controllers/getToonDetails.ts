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
const DUNGEONS_RAID = 14807;
const WARLORDS_OF_DRAENOR = 15233;
const MISTS_OF_PANDARIA = 15164;
const RUKHMAR = 9279;
const OONDASTA = 8147;
const NALAK = 8146;
const SHA_OF_ANGER = 6989;
const GALLEON = 6990;

export const getToonDetailsController = (req: any, res: any) => {
  const token = req.session?.passport?.user?.token;
  const realmSlug = req.params?.realmSlug;
  const toonName = req.params?.toonName;
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },

  };

  const retrieveProfile = (realmSlug:string, toonName:string) => {
    return axios.get(`https://${constRegion}.api.blizzard.com/profile/wow/character/${realmSlug}/${toonName}?namespace=profile-${constRegion}&locale=en_GB&access_token=${token}`,axiosConfig).then(
    profileResponse => {
      return {
            averageItemLevel: profileResponse.data.average_item_level,
            equippedItemLevel: profileResponse.data.equipped_item_level,
          };
    });
  }
  const retrieveMedia = (realmSlug:string, toonName:string) => {
    return axios.get(`https://${constRegion}.api.blizzard.com/profile/wow/character/${realmSlug}/${toonName}/character-media?namespace=profile-${constRegion}&locale=en_GB&access_token=${token}`,axiosConfig).then(
    mediaResponse => {
      return {
            avatar: mediaResponse.data.avatar_url,
            bust: mediaResponse.data.bust_url,
            render: mediaResponse.data.render_url,
          };
    });
  }
  const retrieveStatistic = (realmSlug:string, toonName:string) => {
    return axios.get(`https://${constRegion}.api.blizzard.com/profile/wow/character/${realmSlug}/${toonName}/achievements/statistics?namespace=profile-${constRegion}&locale=en_GB&access_token=${token}`, axiosConfig).then(
      statisticResponse => {
        try {
          const dungeons = statisticResponse.data.categories[statisticResponse.data.categories.findIndex((element) => element.id === DUNGEONS_RAID )];
          const wod = dungeons?.sub_categories[dungeons.sub_categories.findIndex((element) => element.id === WARLORDS_OF_DRAENOR )];
          const mop = dungeons?.sub_categories[dungeons.sub_categories.findIndex((element) => element.id === MISTS_OF_PANDARIA )];
        return {
          kills : {
            rukhmar: wod?.statistics[wod.statistics.findIndex((element) => element.id === RUKHMAR )],
            oondasta: mop?.statistics[mop.statistics.findIndex((element) => element.id === OONDASTA )],
            nalak: mop?.statistics[mop.statistics.findIndex((element) => element.id === NALAK )],
            shaOfAnger: mop?.statistics[mop.statistics.findIndex((element) => element.id === SHA_OF_ANGER )],
            galleon: mop?.statistics[mop.statistics.findIndex((element) => element.id === GALLEON )],
          }
        };
        } catch (error) {
          console.log(error);
        }
       
    });
  }

//   function isDeadThisWeek(timestamp){
//     // If we are Wednesday or past, don't take last wednesday but this Wednesday
//     if(3 <= moment().day()){
//         if(moment(timestamp).isAfter(moment().day(3).hour(9).minute(0).second(0))){
//             return true
//         }
//         return false;
//     }else{
//         if(moment(timestamp).isAfter(moment().day(-4).hour(9).minute(0).second(0))){
//             return true;
//         }
//     }
//     return false;
// }
  if (token && realmSlug && toonName) {
    Promise.all([retrieveMedia(realmSlug, toonName), retrieveStatistic(realmSlug, toonName), retrieveProfile(realmSlug, toonName)]).then((values) => { 
      res.jsonp({media: values[0], statistics: values[1], profile: values[2]});
    }).catch((error) => {
        res.status(500).jsonp({ status: 500, message: error });
      });
  } else {
    res.status(500).jsonp({
      status: 500,
      message: `missing value: token: ${token}, realmSlug: ${realmSlug}, toonName: ${toonName}`,
    });
  }
};

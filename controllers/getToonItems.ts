const constRegion = 'eu';
import axios from 'axios';

import { Item } from 'src/app/item';

export const getToonItemsController = (req: any, res: any) => {
  const token = req.session?.passport?.user?.token;
  const realmSlugValue = req.params?.realmSlug;
  const toonNameValue = req.params?.toonName;
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const formatItem = (itemsResponseData: any): Item[] => {
    const items: Item[] = [];
    itemsResponseData.equipped_items.forEach((item) => {
      if (!['SHIRT', 'TABARD'].includes(item.slot.type)) {
        items.push({
          id: item.item.id,
          name: item.name,
          slot: {
            name: item.slot.name,
            type: item.slot.type,
          },
          itemSubclass: {
            id: item.item_subclass.id,
            name: item.item_subclass.name,
          },
          level: item.level.value,
        });
      }
    });
    return items;
  };

  if (token && realmSlugValue && toonNameValue) {
    return axios
      .get(
        `https://${constRegion}.api.blizzard.com/profile/wow/character/${realmSlugValue}/${toonNameValue}/equipment?namespace=profile-${constRegion}&locale=en_GB&access_token=${token}`,
        axiosConfig
      )
      .then((itemsResponse) => {
        res.jsonp(formatItem(itemsResponse.data));
      })
      .catch((error) => {
        res.status(500).jsonp({ status: 500, message: error });
      });
  } else {
    res.status(500).jsonp({
      status: 500,
      message: `missing value: token: ${token}, realmSlug: ${realmSlugValue}, toonName: ${toonNameValue}`,
    });
  }
};

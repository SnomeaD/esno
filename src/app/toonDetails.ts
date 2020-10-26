export interface KillDetail {
  id: number;
  name: string;
  lastUpdatedTimestamp: number;
  quantity: number;
  isDeadThisWeek: boolean;
}

export interface ToonDetails {
  media: {
    avatar: string;
    bust: string;
    render: string;
    renderRaw: string;
  };
  statistics: {
    kills: KillDetail[];
  };
  profile: {
    averageItemLevel: number;
    equippedItemLevel: number;
  };
}

export interface KillDetail { 
    id: number;
    name: string;
    last_updated_timestamp: number;
    quantity: number;
}

export interface ToonDetails {
    media: {
        avatar: string;
        bust: string;
        render: string;
    },
    statistics: {
        kills : {
            rukhmar: KillDetail;
            oondasta: KillDetail;
            nalak: KillDetail;
            shaOfAnger: KillDetail;
            galleon: KillDetail;
          }
    },
    profile: { 
        averageItemLevel: number;
        equippedItemLevel: number;
    }
}
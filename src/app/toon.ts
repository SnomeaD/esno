import { ToonDetails } from './toonDetails';

export const MAX_LEVEL = 120;

export interface Realm {
  name: string;
  slug: string;
  id: number;
}
export interface WowClass {
  name: string;
  id: number;
}
export interface Race {
  name: string;
  id: number;
}
export interface Gender {
  type: string;
  name: string;
}
export interface Faction {
  type: string;
  name: string;
}
export interface Toon {
  name: string;
  id: number;
  realm: Realm;
  class: WowClass;
  race: Race;
  gender: Gender;
  faction: Faction;
  protectedUrl: string;
  level: number;
  details?: ToonDetails;
}

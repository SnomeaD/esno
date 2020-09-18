export interface Slot {
  type: string; 
  name: string;
}
export interface ItemSubClass {
  id: string;
  name: string; 
}
export interface Item {
  id: number;
  name: string;
  slot: Slot;
  itemSubclass: ItemSubClass;
  level: number;
}